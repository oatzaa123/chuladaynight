import mongoose from 'mongoose'
import configs from './app'

const DB = configs.mongodbUri
const database = {
    mongoDB() {
        mongoose
            .connect(DB, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
            })
            .then(() => console.log('DB connection successful!'))
    },
}

export default database.mongoDB()
