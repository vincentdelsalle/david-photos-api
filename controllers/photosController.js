const Joi = require('@hapi/joi')

// const photos = [
//   {id: 1, place: 'argentine', month: 'mars', year: '2010', file_name: 'uploadFile-1525869322263.jpg', thumb_name: 'uploadFile-1525869322263_thumb.jpg', size: '930029', orientation: 'landscape', photo_name: 'P1030323.JPG', color: 'blue', rank: 1, createdAt: '2018-05-09 12:35:22', updatedAt: '2018-05-09 12:35:22', colorId: null},
//   {id: 2, place: 'bolivie', month: 'juillet', year: '2017', file_name: 'uploadFile-1525869416321.jpg', thumb_name: 'uploadFile-1525869416321_thumb.jpg', size: '937952', orientation: 'portrait', photo_name: 'P1030501.JPG', color: 'green', rank: 2, createdAt: '2018-05-09 12:36:56', updatedAt: '2018-05-09 12:36:56', colorId: null}
// ]

module.exports = {
  findByColor: function (req, res) {
    const currentColor = req.params.color
    // pool.query(`SELECT c.* FROM photos AS p
    //             INNER JOIN colors AS c ON p.colorId = c.colorId 
    //             WHERE c.color_name = ?`, 
    //             [currentColor], (error, photosByColor) => {
    //   if (error) throw res.status(400).send(error.message)

    //   if(!photosByColor.length) return res.status(404).send('No photos for that given color.')

    //   res.send(photosByColor)
    // })
  },
  postPhoto: (req, res) => {
    const { error } = validatePhoto(req.body) 
    if (error) return res.status(400).send(error.details[0].message)
  
    const photo = {
	    // "photoId": 9,
	    // "place": "New York",
	    // "month": "mars",
	    // "year": 2019,
      // "file_name": "file-name-here.jpg",
      // "thumb_name": "thumb-name-here.jpg",
      // "size": "1930123",
	    // "orientation": "portarit",
	    // "photo_name": "photo-name.jpg",
      // "rank": 1,
      // "colorId": parseInt(req.body.colorId)
}
    // Add a new photo
    photos.push(photo)
    res.send(photo)
  },
}

// fx validation photos inputs
function validatePhoto(data) {
  const today = new Date()
  const schema = Joi.object({
    place: Joi.string()
              .min(2)
              .max(30)
              .pattern(/^([a-zéèêàùïôæœç()"-]+\s?)*\s*$/i, 'place name')
              .required(),
    year: Joi.number()
             .integer()
             .min(1900)
             .max(today.getFullYear())
             .required()
  })
  return schema.validate(data)
}