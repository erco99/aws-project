const mongoose = require('mongoose')

async function connect() {
    try {
        const url = process.env.MONGO_URL
        const port = process.env.MONGO_PORT
        const name = process.env.DB_NAME
        await mongoose.connect(`mongodb://${url}:${port}/${name}`)
        return true
    } catch (error) {
        throw new Error(`Error while connecting do mongodb database: ${error}`)
    }
}

module.exports = connect