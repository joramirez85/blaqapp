const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const userRoutes = require('./api/routes/users')
const personalInfoRoutes = require('./api/routes/personalInfo')

// mongoose.connect('mongodb://localhost:27017/blaqapp')
mongoose.connect('mongodb+srv://m0ng0DB:Un05quar32o2o@cluster0-mrbzd.mongodb.net/blaqapps?retryWrites=true&w=majority')
mongoose.Promise = global.Promise

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/info/', personalInfoRoutes)

app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) =>{
  res.status(error.status || 500)
  res.json({
      error: {
          message: error.message
      }
  })
})

/* app.use((req, res, next) => {
  res.status(200).json('BlaqApp API working correctly')
}) */

module.exports = app
