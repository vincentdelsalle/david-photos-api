const logger = require('../startup/logging')
const mongoose = require('mongoose')
const dbConfig = require('../dbConfig')

module.exports = function() {
  mongoose.connect(`mongodb://${dbConfig.host}:27017/${dbConfig.database}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => logger.info('Connected to MongoDB...'))
}