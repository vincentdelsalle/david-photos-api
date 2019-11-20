const express = require('express')
const router = express.Router()
const photoCtrl = require('../controllers/photosController')

// Getting all photos
router.get('/', photoCtrl.getAllPhotos)
// Getting photos by color   <---- this one collapsed with getPhotoById / use getAllPhotos  to grab one OR create another route
// router.get('/:color', photoCtrl.getPhotosByColor)
// Getting 1 photo by id
router.get('/:id', photoCtrl.getPhotoById)
// Post a photo
router.post('/', photoCtrl.postPhoto)
// Edit a photo
router.put('/:id', photoCtrl.editPhoto)
// Delete a photo
router.delete('/:id', photoCtrl.deletePhoto)

module.exports = router