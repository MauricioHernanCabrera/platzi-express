const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser');

const boom = require('boom')
const debug = require('debug')('app:server')
const productsViewRouter = require('./routes/views/products')
const productsApiRouter = require('./routes/api/products')
const authApiRouter = require('./routes/api/auth')

const {
    logErrors,
    clientErrorHandler,
    wrapErrors,
    errorHandler
} = require('./utils/middlewares/errorsHandlers')

const helmet = require('helmet')

const isRequestAjaxOrApi = require('./utils/isRequestAjaxOrApi')

// app
const app = express()

// cors
// const corsOptions = { origin: 'http://example.com' }
app.use(cors())

// security
app.use(helmet())

// middleware
app.use(bodyParser.json())

// error handlers
app.use(logErrors)
app.use(wrapErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

// statics files
app.use('/static', express.static(path.join(__dirname, 'public')))

// view engine setup
app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'pug')

// routes
app.use('/products', productsViewRouter)

productsApiRouter(app)
app.use('/api/auth', authApiRouter)

// redirect
app.get('/', function (req, res) {
    res.redirect('/products')
})

app.use(function (req, res, next) {
    if (isRequestAjaxOrApi(req)) {
        const {
            output: { statusCode, payload }
        } = boom.notFound()

        res.status(statusCode).json(payload)
    }
    res.status(404).render('404')
})

// server
const server = app.listen(8000, function () {
    debug(`Listening http://localhost:${server.address().port}`)
})