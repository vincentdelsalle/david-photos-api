const mongoose = require('mongoose')

const colorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  hexacode: {
    type: String,
    minlength: 7,
    maxlength: 7
  },
  isPublished: Boolean
})

const Color = mongoose.model('Color', colorSchema)

// async function createColor() {
//   const colors = new Colors({
//     name: 'white', 
//     hexacode: '#ebebeb',
//     isPublished: true
//   })
  
//   const result = await colors.save()
//   console.log(result)
// }

// createColor()

exports.colorSchema = colorSchema
exports.Color = Color