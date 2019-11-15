const express = require('express')
const router = express.Router()
const colorCtrl = require('../controllers/colorsController')

// Getting all colors
router.get('/', colorCtrl.findAll)
// Getting all colors except current (for the sidemenu)
router.get('/:color', colorCtrl.findAllExceptCurrent)
// Getting hexadecimal code by color
router.get('/:color/hexa', colorCtrl.findHexacodeColor)

module.exports = router