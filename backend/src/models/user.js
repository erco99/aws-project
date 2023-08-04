const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
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
            required: true,
            lowercase: true,
            trim: true,
            unique: true
        },

        number: {
            type: String,
            required: true
        },

        balance: {
            type: Number,
            required: true
        },

        payment_method: {
            card_number: {
                type: Number,
                required: false
            },
            card_owner: {
                type: String,
                required: false
            },
            card_expiration: {
                type: String,
                required: false
            }, 
            card_cvv: {
                type: String,
                required: false
            },
        },

        hash: {
            type: String,
            required: true
        },

        status: String,

        refresh_token: {
            value: {
                type: String,
                required: false
            },
            iat: {
                type: Number,
                required: false
            }
        }
    },
    {
        virtuals: {
            full_name: {
                get() {
                    return this.name + ' ' + this.surname
                }
            },

            id: {
                get(){
                    return this._id
                }
            }
        }
    }
)

module.exports = mongoose.model('user', userSchema);