const logger = require('../startup/logging')

module.exports = function(err, req, res, next) {
  logger.error(new Error(err))
  
  res.status(500).send('Something failed.')
}