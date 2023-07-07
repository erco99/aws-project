const mongodbConfig = {
    connection: {
        host: process.env.MONGO_URL,
        port: process.env.MONGO_PORT,
        uri: `mongodb://${process.env.MONGO_URL}:${process.env.MONGO_PORT}/${process.env.DB_NAME}`
    },
    db: {
        name: process.env.DB_NAME,
    },
}

module.exports = mongodbConfig;