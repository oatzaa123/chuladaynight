const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    port: process.env.PORT || 3000,
    mongodbUri:
        process.env.NODE_ENV.trim() === 'production'
            ? process.env.MONGODB_URI_PROD
            : process.env.MONGODB_URI,
}
