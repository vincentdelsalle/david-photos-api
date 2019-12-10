const logger = require('../startup/logging')
const mongoose = require('mongoose')
const dbConfig = require('../dbConfig')

module.exports = function() {
  const db = dbConfig.database
  mongoose.connect(`mongodb://${dbConfig.host}:27017/${db}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => logger.info(`Connected to ${db}...`))
}