const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose')
const colors = require('./routes/colors')
const photos = require('./routes/photos')
require('dotenv').config()
const express = require('express')
const app = express()

mongoose.connect(`mongodb://${process.env.DB_HOST}/david-photos`)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err))

app.use(express.json())
app.use('/api/colors', colors)
app.use('/api/photos', photos)

const port = process.env.PORT
app.listen(port, () => console.log(`listening on port ${port}...`))