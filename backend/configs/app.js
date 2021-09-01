import dotenv from 'dotenv'
dotenv.config()

const configs = {
    port: process.env.PORT || 3000,
    mongodbUri:
        process.env.NODE_ENV === 'production'
            ? process.env.MONGODB_URI_PROD
            : process.env.MONGODB_URI,
}

export default configs
