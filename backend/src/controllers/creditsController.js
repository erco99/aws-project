const User = require("../models/user");
const Transactions = require('../models/transactions');

async function paymentMethodInsert(req, res) {
  //qui ci andrebbe il controllo per verificare che la carta
  //è una carta reale ma noi lo saltiamo in quanto i pagamenti
  //sono ovviamente simulati
  const payment_method = req.body.payment_method;
  const user_email = req.body.user_email

  console.log(payment_method)
  console.log(user_email)

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

  //change , to . in amount
  if(amount.includes(',')) {
    newBalance = amount.replace(',', '.')
  }

  let amountValue = newBalance

  console.log(parseFloat(amount))

  if(transaction_type == 'positive') {
    newBalance = parseFloat(retrievedUser.balance) + parseFloat(newBalance)
  } else if(transaction_type == 'negative') {
    newBalance = parseFloat(retrievedUser.balance) - parseFloat(newBalance)
  }

  console.log(newBalance)


  const filter = {email: user.email}
  const update = {balance: newBalance.toFixed(2)}

  try {
    await Transactions.create({amount: amountValue, transaction_type, description, date, time, user});
    await User.findOneAndUpdate(filter, update)
  } catch (error) {
      console.log(error);
      return res.status(500).json({'message': 'Error'});
  }
}

async function getTransactions(req, res) {
  const fullname = req.body.fullname
  const email = req.body.email

  const prova = await Transactions.find({ user: {fullname: fullname, email: email }}).exec()
  
  return res.status(200).json(prova)
}

module.exports = {paymentMethodInsert, depositWithdrawMoney, getTransactions}