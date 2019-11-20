const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Joi = require('@hapi/joi')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
    trim: true,
    minlength: 5, 
    maxlength: 30,
  },
  email: {
    type: String,
    required: true, 
    minlength: 5, 
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true, 
    minlength: 5, 
    maxlength: 1024,
  },
  isAdmin: Boolean
})

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.davidApi_jwtPrivateKey)
  return token
}

const User = mongoose.model('User', userSchema)

// fx validation inputs
function validateUser(data) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  })
  return schema.validate(data)
}

exports.User = User
exports.validate = validateUser