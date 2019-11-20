const auth = require('../middleware/auth')
const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/usersController')

// Getting current user
router.get('/me', auth, userCtrl.getCurrentUser)
// Registering user
router.post('/', userCtrl.registerUser)

module.exports = router