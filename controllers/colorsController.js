// const colors = [
//   {id: 1, name: 'purple', hexacode: '#a3307d'},
//   {id: 2, name: 'brown', hexacode: '#3e1d0c'},
//   {id: 3, name: 'yellow', hexacode: '#e5c55e'},
//   {id: 4, name: 'red', hexacode: '#dc0a0b'},
//   {id: 5, name: 'black-white', hexacode: '#ebebeb'},
//   {id: 6, name: 'black', hexacode: '#000000'},
//   {id: 7, name: 'green', hexacode: '#267c3f'},
//   {id: 8, name: 'grey', hexacode: '#6f787d'},
//   {id: 9, name: 'blue', hexacode: '#0e104d'},
//   {id: 10, name: 'white', hexacode: '#ebebeb'},
// ]

module.exports = {
  findAll: (req, res) => {
    // pool.query('SELECT * FROM colors', (error, colors) => {
    //   if (error) throw res.status(400).send(error.message)

    //   res.send(colors)
    // })
  },
  findAllExceptCurrent: (req, res) => {
    const currentColor = req.params.color;
    const color = colors.find(c => c.name === currentColor)
    if(!color) return res.status(404).send('Color not found.')

    const index = colors.indexOf(color)
    colors.splice(index, 1)
    res.send(colors)
  },
  findHexacodeColor: (req, res) => {
    const currentColor = req.params.color;
    // pool.query('SELECT hexacode FROM colors WHERE name = ?', [currentColor], (error, hexacode) => {
    //   if (error) throw res.status(400).send(error.message)

    //   if(!hexacode.length) return res.status(404).send('Hexacode not found.')
      
    //   res.send(hexacode)
    // })
  }
}