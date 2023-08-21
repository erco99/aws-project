const User = require("../models/user");
const Transactions = require('../models/transactions');

async function paymentMethodInsert(req, res) {
  //qui ci andrebbe il controllo per verificare che la carta
  //è una carta reale ma noi lo saltiamo in quanto i pagamenti
  //sono ovviamente simulati
  const payment_method = req.body.payment_method;
  const user_email = req.body.user_email

  try {
    await User.findOneAndUpdate({email: user_email},{payment_method: payment_method});
  } catch (error) {
      console.log(error);
      return res.status(500).json({'message': 'Error'});
  }
}

async function depositWithdrawMoney(req, res) {
  const {amount, transaction_type, description, date, time, user} = req.body

  const retrievedUser = await User.findOne({email: user.email}).exec()

  let newBalance = amount

  let amountValue;
  if(amount.includes(',')) {
    amountValue = parseFloat(amount.replace(',', '.'));
  } else {
    amountValue = parseInt(amount);
  }

  if(transaction_type == 'positive') {
    newBalance = parseFloat(retrievedUser.balance) + parseFloat(newBalance)
  } else if(transaction_type == 'negative') {
    newBalance = parseFloat(retrievedUser.balance) - parseFloat(newBalance)
  }

  const filter = {email: user.email}
  const update = {balance: newBalance.toFixed(2)}

  try {
    const transactionData = {amount: amountValue, transaction_type, description, date, time, user};
    await Transactions.create(transactionData);
    global.io.emit("new-transaction", transactionData);
    await User.findOneAndUpdate(filter, update)
    return res.status(200).json({amount: parseFloat(transaction_type === 'negative' ? - amountValue : amountValue)})
  } catch (error) {
      console.log(error);
      return res.status(500).json({'message': 'Error'});
  }
}

async function getTransactions(req, res) {
  const fullname = req.body.fullname
  const email = req.body.email

  const data = await Transactions.find({ user: {fullname: fullname, email: email }}).exec()
  
  return res.status(200).json(data)
}

async function deletePaymentMethod(req, res) {
  const user_email = req.body.email
  console.log(user_email)
  try {
    await User.updateOne({email: user_email}, {$unset: {payment_method:1}})
  } catch (error) {
      console.log(error);
      return res.status(500).json({'message': 'Error'});
  }
}

async function sendMoney(req, res) {
  const sender_data = req.body.sender_data
  const receiver_data = req.body.receiver_data
  const date = req.body.date
  const time = req.body.time
  const amount = req.body.amount

  let amountValue;
  if(amount.includes(',')) {
    amountValue = parseFloat(amount.replace(',', '.'));
  } else {
    amountValue = parseInt(amount);
  }

  const receiverEmail = receiver_data.email

  const user = await User.findOne({email: receiverEmail}).exec();

  if (!user) return res.status(401).json({'message': 'Email or password is incorrect'});

  const sender = {
    fullname: sender_data.fullname,
    email: sender_data.email
  }

  const receiver_fullname = user.name + ' ' + user.surname

  const receiver = {
    fullname: receiver_fullname,
    email: receiver_data.email 
  }

  const newBalanceSender = parseFloat(sender_data.balance) - amountValue
  const newBalanceReceiver = parseFloat(user.balance) + amountValue

  try {
    // negative transaction and balance reduced for sender
    const senderTransactionData = {
      amount: amountValue,
      transaction_type: 'negative',
      description: 'Invio denaro a ' + receiver_fullname,
      date: date,
      time: time,
      user: sender};
    await Transactions.create(senderTransactionData);
    await User.findOneAndUpdate({email: sender_data.email}, {balance: newBalanceSender.toFixed(2)})
    global.io.emit("new-transaction", senderTransactionData);

    //positive transaciton and balance increased for receiver
    const receiverTransactionData = {
      amount: amountValue,
      transaction_type: 'positive',
      description: "Ricezione denaro da " + sender.fullname,
      date: date,
      time:time,
      user: receiver};
    await Transactions.create(receiverTransactionData)
    await User.findOneAndUpdate({email: receiver_data.email}, {balance: newBalanceReceiver.toFixed(2)})
    global.io.emit("new-transaction", receiverTransactionData);
    return res.sendStatus(200)
  } catch(error) {
    console.log(error);
    return res.status(500).json({'message': 'Error'});
  }
}

module.exports = {
  paymentMethodInsert, 
  depositWithdrawMoney, 
  getTransactions, 
  deletePaymentMethod,
  sendMoney
}