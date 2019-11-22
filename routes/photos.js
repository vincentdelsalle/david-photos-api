const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const mongoose = require('mongoose')
const { Photo, validate } = require('../models/photoModel')
const { Color } = require('../models/colorModel')
const express = require('express')
const router = express.Router()

// Getting all photos
router.get('/', async (req, res) => {
  const photos = await Photo.find().sort({name: 1})
  res.send(photos)
})

// Getting photos by color   <---- this one collapsed with getPhotoById / use getAllPhotos  to grab one OR create another route
// router.get('/:color', photoCtrl.getPhotosByColor)
// Getting 1 photo by id
router.get('/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send('Invalid Photo.')
  
  const photo = await Photo.findById(req.params.id)
  if (!photo) return res.status(404).send('The Photo with the given ID was not found.')

  res.send(photo)
})

// Post a photo
router.post('/', [auth, admin], async (req, res) => {
  const { error } = validate(req.body) 
  if (error) return res.status(400).send(error.details[0].message)

  const color = await Color.findById(req.body.colorId)
  if(!color) return res.status(400).send('Invalid Color.')

  const photo = new Photo({
    place: req.body.place,
    month: req.body.month,
    year: req.body.year,
    color: {
      _id: color._id, 
      name: color.name
    }
  })
  
  // Add a new photo
  // try {
    await photo.save()
    res.send(photo)
  // } catch (ex) {
  //   let errorMessage = []
  //   for (field in ex.errors) {
  //     console.log(ex.errors[field].message)
  //     errorMessage.push(ex.errors[field].message)
  //   }
  //   res.status(404).send(errorMessage)
  // }
})

// Edit a photo
router.put('/:id', [auth, admin], async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send('Invalid Photo.')

  const { error } = validate(req.body) 
  if (error) return res.status(400).send(error.details[0].message)

  const color = await Color.findById(req.body.colorId)
  if(!color) return res.status(400).send('Invalid Color.')

  const photo = await Photo.findByIdAndUpdate(req.params.id,
    { 
      name: req.body.name,
      month: req.body.month,
      year: req.body.year,
      color: {
        _id: color._id, 
        name: color.name
      } 
    }, { new: true })
  
  if (!photo) return res.status(404).send('The Photo with the given ID was not found.')

  res.send(photo)
})

// Delete a photo
router.delete('/:id', [auth, admin], async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send('Invalid Photo.')
  
  const photo = await Photo.findByIdAndRemove(req.params.id)

  if (!photo) return res.status(404).send('The Photo with the given ID was not found.')

  res.send(photo)
})

module.exports = router