const { Color } = require('../models/colorModel')

module.exports = {
  getAllColors: async (req, res) => {
    const colors = await Color.find().sort({name: 1})
    res.send(colors)
  },
  getAllColorsExceptCurrent: async (req, res) => {
    const currentColor = await Color.findOne({ name: req.params.color })
    if(!currentColor) return res.status(404).send('Color not found.')
    
    const colors = await Color
      .find({ name: { $nin: req.params.color } })
      .sort({ name: 1 })
    
      res.send(colors)
  },
  getHexacodeColor: async (req, res) => {
    const hexacode = await Color
      .findOne({ name: req.params.color })
      .select('hexacode')
    if(!hexacode) return res.status(404).send('Color not found.')

    res.send(hexacode)
  }
}