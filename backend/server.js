import express from 'express'
import path from 'path'
import configs from './configs/app'
import ErrorHandler from './helpers/errorHandler'
import globalErrorHandler from './helpers/errorController'
import AppRoutes from './modules/web/index'
import './configs/express'

const app = express()
// (app)
app.use('/api_v1', AppRoutes)

app.use(
    '/images',
    express.static(path.join(__dirname, './assets/uploads/images'))
)

app.use(
    '/videos',
    express.static(path.join(__dirname, './assets/uploads/videos'))
)

app.use(
    '/models',
    express.static(path.join(__dirname, './assets/uploads/models'))
)

app.all('*', (req, res, next) => {
    next(
        new ErrorHandler(`Can't find ${req.originalUrl} on this server !`, 404)
    )
})

app.use(globalErrorHandler)

app.listen(configs.port, () =>
    console.log(`Server is running on port : ${configs.port}`)
)
