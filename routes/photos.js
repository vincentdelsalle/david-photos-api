const express = require('express')
const router = express.Router()
const photoCtrl = require('../controllers/photosController')

// Getting photos by color
router.get('/:color', photoCtrl.findByColor)
// Post a photo
router.post('/', photoCtrl.postPhoto)

module.exports = router