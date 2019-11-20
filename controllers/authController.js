const Joi = require('@hapi/joi')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const mongoose = require('mongoose')
const { User } = require('../models/userModel')

module.exports = {
  signInUser: async (req, res) => {
    const { error } = validate(req.body) 
    if (error) return res.status(400).send(error.details[0].message)

    // check if there is a user with the given email in the DB
    let user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Invalid email or password.')

    // validate the password using bcrypt
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send('Invalid email or password.')

    //here the login process is valid
    const token = user.generateAuthToken()
    res.send(token)
  }
}

// fx validation inputs
function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  })
  return schema.validate(req)
}