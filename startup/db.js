const winston = require('winston')
const mongoose = require('mongoose')
const dbConfig = require('../dbConfig')

module.exports = function() {
  mongoose.connect(`mongodb://${dbConfig.host}:27017/${dbConfig.database}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => winston.info('Connected to MongoDB...'))
}