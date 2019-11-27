const { createLogger, format, level, transports } = require('winston')
const { errors, combine, timestamp , metadata, json, colorize, simple } = format
require('winston-mongodb')
require('express-async-errors');
require('dotenv').config()
const dbConfig = require('../dbConfig')

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    errors({ stack: true }),
    metadata({ fillWith: ['stack', 'timestamp'], key: 'logInfo' }),
    json()
  ),
  transports: [
    new transports.File({ 
      filename: 'logs/errors.log'
    }),
   ],
  exceptionHandlers: [
    new transports.File({ filename: 'logs/exceptions.log', level: 'info' })
  ]
})

process.on('unhandledRejection', (ex) => {
  throw ex
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: combine(
        colorize(),
        simple()
      )
    }),
  )
} else {
  logger.add(new transports.MongoDB({ 
    db: `mongodb://${dbConfig.host}:27017/${dbConfig.database}`,
    options: { useUnifiedTopology: true },
    metaKey: 'logInfo'
  }))
}

module.exports = logger