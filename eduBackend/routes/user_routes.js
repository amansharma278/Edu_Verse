const express = require('express')

const router = express.Router()

const { signup, sendOTP } = require('../controllers/auth')
const { login } = require('../controllers/auth')
const { restPassword, updatePassword } = require('../controllers/RestPassword')
const { getProfile, updateProfile } = require('../controllers/profile')
const { auth, isAdmin } = require('../middlewares/auth')
const { getUsers, updateUserStatus } = require('../controllers/admin')

router.post('/sendotp', sendOTP)
router.post('/signup', signup)

// request password reset link
router.post('/rest-password', restPassword)

// complete password reset
router.post('/rest-password/:token', updatePassword)
router.post('/login', login)
router.get('/profile', auth, getProfile)
router.put('/profile', auth, updateProfile)
router.get('/admin/users', auth, isAdmin, getUsers)
router.patch('/admin/users/:userId/status', auth, isAdmin, updateUserStatus)

module.exports = router
