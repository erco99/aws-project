const User = require("../models/user");
const Transactions = require('../models/transactions');

async function paymentMethodInsert(req, res) {
  //qui ci andrebbe il controllo per verificare che la carta
  //è una carta reale ma noi lo saltiamo in quanto i pagamenti
  //sono ovviamente simulati
  const payment_method = req.body;

  try {
    await User.updateMany({},{payment_method});
  } catch (error) {
      console.log(error);
      return res.status(500).json({'message': 'Error'});
  }
}

async function depositWithdrawMoney(req, res) {
  const {amount, transaction_type, date, time, user} = req.body

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
    await Transactions.create({amount: amountValue, transaction_type, date, time, user});
    await User.findOneAndUpdate(filter, update)
  } catch (error) {
      console.log(error);
      return res.status(500).json({'message': 'Error'});
  }
}

module.exports = {paymentMethodInsert, depositWithdrawMoney}