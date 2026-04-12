const express = require('express')

const router = express.Router()

const { signup } = require('../controllers/auth')
const { restPassword, updatePassword } = require('../controllers/RestPassword')

// signup route
router.post('/signup', signup)

// request password reset link
router.post('/rest-password', restPassword)

// complete password reset
router.post('/rest-password/:token', updatePassword)

module.exports = router
