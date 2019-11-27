const express = require('express')
const colors = require('../routes/colors')
const photos = require('../routes/photos')
const users = require('../routes/users')
const auth = require('../routes/auth')
const error = require('../middleware/error')

module.exports = function (app) {
  app.use(express.json())
  app.use('/api/colors', colors)
  app.use('/api/photos', photos)
  app.use('/api/users', users)
  app.use('/api/auth', auth)
  app.use(error)
}