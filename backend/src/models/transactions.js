const mongoose = require("mongoose");

const transactionsSchema = mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    transaction_type: {
        type: String,
        required: true
    },
    description: {
        type: String,
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
        fullname: {
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