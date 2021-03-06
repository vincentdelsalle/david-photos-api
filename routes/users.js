const auth = require('../middleware/auth')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const { User, validate } = require('../models/userModel')
const express = require('express')
const router = express.Router()

// Getting current user
router.get('/me', auth, async (req, res) => {
  // thx to the middleware auth fx , we have here req.user object
  const user = await User.findById(req.user._id).select('-password')
  res.send(user)
})

// Registering user
router.post('/', async (req, res) => {
  const { error } = validate(req.body) 
  if (error) return res.status(400).send(error.details[0].message)

  // check if user is not already registered
  let user = await User.findOne({ email: req.body.email })
  if (user) return res.status(400).send('User already registered.')

  user = new User(_.pick(req.body, ['name', 'email', 'password']))
  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)

  await user.save()

  const token = user.generateAuthToken()
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']))
})

module.exports = router