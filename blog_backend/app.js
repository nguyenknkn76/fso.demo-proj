const config = ('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/BlogRouter')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')


mongoose.set('strictQuery', false)
logger.info(`connecting to ${config.MONGODB_URI}`)
mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MONGODB')
    })
    .catch((err) => {
        logger.error(`error connecting to MONGODB: ${err.message}`)
    })

app.use(cors())
// app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)
app.use('/api/blogs', blogRouter)

module.exports = app
