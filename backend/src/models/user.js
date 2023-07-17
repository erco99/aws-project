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

        hash: {
            type: String,
            required: true
        },

        refresh_token: {
            value: {
                type: String,
                required: true
            },
            iat: {
                type: Number,
                required: true
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