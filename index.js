const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)
require('dotenv').config()
const express = require('express')
const app = express()

require('./startup/logging')
require('./startup/routes')(app)
require('./startup/db')()


if (!process.env.davidApi_jwtPrivateKey) {
  console.error('FATAL ERROR: davidApi_jwtPrivateKey is not defined.')
  process.exit(1)
}


const port = process.env.PORT
app.listen(port, () => console.log(`listening on port ${port}...`))