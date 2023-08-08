const mongoose = require("mongoose");

const transactionsSchema = mongoose.Schema({
    _id: true,
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    user: {
        name: {
            type: String,
            required: true
        },
        surname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    }
});
  
module.exports = mongoose.model("transactions", transactionsSchema);