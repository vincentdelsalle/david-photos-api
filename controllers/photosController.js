const mongoose = require('mongoose')
const { Photo, validate } = require('../models/photoModel')
const { Color } = require('../models/colorModel')

module.exports = {
  getAllPhotos: async (req, res) => {
    const photos = await Photo.find().sort({name: 1})
    res.send(photos)
  },
  // getPhotosByColor: async (req, res) => {
  //   const photos = await Photo.find({ "color.name": req.params.color })
  //   if (!photos.length) return res.status(404).send('The Gallery with the given color was not found.')

  //   res.send(photos)
  // },
  getPhotoById: async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send('Invalid Photo.')
    
    const photo = await Photo.findById(req.params.id)
    if (!photo) return res.status(404).send('The Photo with the given ID was not found.')

    res.send(photo)
  },
  postPhoto: async (req, res) => {
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
  },
  editPhoto: async (req, res) => {
    const { error } = validate(req.body) 
    if (error) return res.status(400).send(error.details[0].message)
  
    // something needsto be clarified here :
    // the id is in the url as well as in the body
    // if it's a correct id in the url (found in the DB), 
    //            whatever is the id in the body (as long as it's a valid 
    //            Objectid fomat) the phot with the id of the url will be modify
    const photo = await Photo.findByIdAndUpdate(req.params.id, req.body, { 
      new: true 
    })
    
    if (!photo) return res.status(404).send('Invalid Photo.')

    res.send(photo)
  },
  deletePhoto: async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send('Invalid Photo.')
    
    const photo = await Photo.findByIdAndRemove(req.params.id)

    if (!photo) return res.status(404).send('The Photo with the given ID was not found.')

    res.send(photo)
  }
}