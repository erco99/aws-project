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

async function depositMoney(req, res) {
  let {amount, date, time, user} = req.body

  const retrievedUser = await User.findOne({email: user.email}).exec()

  //change , to . in amount
  if(amount.includes(',')) {
    amount = amount.replace(',', '.')
  }


  amount = parseFloat(retrievedUser.balance) + parseFloat(amount)

  console.log(amount.toFixed(2))
  const filter = {email: user.email}
  const update = {balance: amount.toFixed(2)}

  try {
    //await Transactions.create({},{payment_method});
    await User.findOneAndUpdate(filter, update)
  } catch (error) {
      console.log(error);
      return res.status(500).json({'message': 'Error'});
  }
}

module.exports = {paymentMethodInsert, depositMoney}