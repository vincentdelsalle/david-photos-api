const colors = require('./routes/colors')
const photos = require('./routes/photos')
require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.json())
app.use('/api/colors', colors)
app.use('/api/photos', photos)

const port = process.env.PORT
app.listen(port, () => console.log(`listening on port ${port}...`))