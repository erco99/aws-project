const User = require("../models/user");

async function paymentMethodInsert(req, res) {
  //qui ci andrebbe il controllo per verificare che la carta
  //è una carta reale ma noi lo saltiamo in quanto i pagamenti
  //sono ovviamente simulati
  const payment_method = req.body;

  console.log(payment_method)
  try {
    await User.updateMany({},{payment_method});
  } catch (error) {
      console.log(error);
      return res.status(500).json({'message': 'Error'});
  }
}

module.exports = {paymentMethodInsert}