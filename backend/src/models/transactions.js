const mongoose = require("mongoose");

const transactionsSchema = mongoose.Schema({
    _id: true,
    amount: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    user: {
        
    }
});
  
module.exports = mongoose.model("transactions", transactionsSchema);