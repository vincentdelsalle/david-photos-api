const logger = require('./startup/logging')
const express = require('express')
const app = express()

require('./startup/logging')
require('./startup/routes')(app)
require('./startup/db')()
require('./startup/config')()
require('./startup/validation')()

const port = process.env.PORT
app.listen(port, () => logger.info(`listening on port ${port}...`))