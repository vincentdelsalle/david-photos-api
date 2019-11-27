module.exports = function() {
  if (!process.env.davidApi_jwtPrivateKey) {
    throw new Error('FATAL ERROR: davidApi_jwtPrivateKey is not defined.')
  }
}