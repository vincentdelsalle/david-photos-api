const { Color } = require('../models/colorModel')
const express = require('express')
const router = express.Router()

// Getting all colors
router.get('/', async (req, res) => {
  const colors = await Color.find().sort({name: 1})
  res.send(colors)
})

// Getting all colors except current (for the sidemenu)
router.get('/:color', async (req, res) => {
  const currentColor = await Color.findOne({ name: req.params.color })
  if(!currentColor) return res.status(404).send('Color not found.')
  
  const colors = await Color
    .find({ name: { $nin: req.params.color } })
    .sort({ name: 1 })
  
    res.send(colors)
})

// Getting hexadecimal code by color
router.get('/:color/hexa', async (req, res) => {
  const hexacode = await Color
    .findOne({ name: req.params.color })
    .select('hexacode')
  if(!hexacode) return res.status(404).send('Color not found.')

  res.send(hexacode)
})

module.exports = router