require('dotenv').config()
require('./config/database')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express')
const helmet = require('helmet')

const notFoundMiddleware = require('./middleware/notFoundMiddleware')
const loggerMiddleware = require('./middleware/loggerMiddleware')
const errorHandlerMiddleware = require('./middleware/errorHandlerMiddleware')

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const errorRoutes = require('./routes/error')

const app = express()
const { NODE_ENV, ORIGIN_DEV, ORIGIN_PROD, PORT } = process.env
const port = PORT || 3001

//Middlewares
app.use(
  cors({
    credentials: true,
    origin: NODE_ENV === 'development' ? ORIGIN_DEV : ORIGIN_PROD,
  })
)
app.use(helmet())
app.use(cookieParser())
app.use(express.json())
app.use(loggerMiddleware)

// Routes
app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/error', errorRoutes)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

module.exports = { app, server }
