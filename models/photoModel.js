const mongoose = require('mongoose')
const Joi = require('@hapi/joi')
const { colorSchema } = require('./colorModel')

const today = new Date()

const Photo = mongoose.model('Photo', new mongoose.Schema({
  // photoId: Number,  <--------- the db will handle that id
  place: {
    type: String,
    required: true, 
    trim: true,
    minlength: 2, 
    maxlength: 30,
    match: /^([a-zéèêàùïôæœç()-]+\s?)*\s*$/i
  },
  month: {
    type: String,
    required: true, 
    trim: true,
    minlength: 3, 
    maxlength: 30
  },
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: today.getFullYear()
  },
  // file_name: String,
  // thumb_name: String,
  // size: Number,
  // orientation: String,
  // photo_name: String,
  // rank: Number,
  // colorId: Number,
  color: {
    type: colorSchema,
    required: true
  }
  // name: String,
  // hexacode: String,
  // updatedAt: {type: Date, default: Date.now},
  // isPublished: Boolean
}))

// const photos = [
//   {id: 1, place: 'argentine', month: 'mars', year: '2010', file_name: 'uploadFile-1525869322263.jpg', thumb_name: 'uploadFile-1525869322263_thumb.jpg', size: '930029', orientation: 'landscape', photo_name: 'P1030323.JPG', color: 'blue', rank: 1, createdAt: '2018-05-09 12:35:22', updatedAt: '2018-05-09 12:35:22', colorId: null},
//   {id: 2, place: 'bolivie', month: 'juillet', year: '2017', file_name: 'uploadFile-1525869416321.jpg', thumb_name: 'uploadFile-1525869416321_thumb.jpg', size: '937952', orientation: 'portrait', photo_name: 'P1030501.JPG', color: 'green', rank: 2, createdAt: '2018-05-09 12:36:56', updatedAt: '2018-05-09 12:36:56', colorId: null}
// ]


// fx validation photos inputs
function validatePhoto(data) {
  const schema = Joi.object({
    place: Joi.string().min(2).max(30).pattern(/^([a-zéèêàùïôæœç()-]+\s?)*\s*$/i, 'place name').required(),
    month: Joi.string().min(3).max(30).required(),
    year: Joi.number().integer().min(1900).max(today.getFullYear()).required(),
    colorId: Joi.objectId().required()
  })
  return schema.validate(data)
}

// module.exports.Photo = Photo
  // OR (because "exports" is a ref to "module.exports")
exports.Photo = Photo
exports.validate = validatePhoto
