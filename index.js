require('express-async-errors');
const error = require('./middleware/error')
const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose')
const colors = require('./routes/colors')
const photos = require('./routes/photos')
const users = require('./routes/users')
const auth = require('./routes/auth')
require('dotenv').config()
const dbConfig = require('./dbConfig')
const express = require('express')
const app = express()

if (!process.env.davidApi_jwtPrivateKey) {
  console.error('FATAL ERROR: davidApi_jwtPrivateKey is not defined.')
  process.exit(1)
}

mongoose.connect(`mongodb://${dbConfig.host}:27017/${dbConfig.database}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err))

app.use(express.json())
app.use('/api/colors', colors)
app.use('/api/photos', photos)
app.use('/api/users', users)
app.use('/api/auth', auth)
app.use(error)

const port = process.env.PORT
app.listen(port, () => console.log(`listening on port ${port}...`))