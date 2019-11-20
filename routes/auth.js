const express = require('express')
const router = express.Router()
const authCtrl = require('../controllers/authController')

// Registering user
router.post('/', authCtrl.signInUser)

module.exports = router