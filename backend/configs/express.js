import express from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import xss from 'xss-clean'
import hpp from 'hpp'
import './database'

const app = express()
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

export default async function () {
    app.use(helmet())

    const limiter = rateLimit({
        max: 100,
        windowMs: 60 * 1000,
        message:
            'Too many requests from this IP, please try again in an minutes!',
    })

    app.use('/', limiter)
    app.use(cors(corsOptions))

    app.use(
        fileUpload({
            limits: { fileSize: 50 * 1024 * 5024000 },
        })
    )

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        )
        res.header('Access-Control-Allow-Methods', 'DELETE, POST, GET, OPTIONS')
        next()
    })

    app.use(express.json({ limit: '10kb' }))
    app.use(express.urlencoded({ extended: false, limit: '500mb' }))

    app.use(mongoSanitize())
    app.use(xss())
    app.use(hpp())
}
