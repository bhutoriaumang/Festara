const express = require('express')

const router = express.Router()

const { loginUser, registerUser, updateUserEvents } = require('../controllers/userController')

router.post('/login', loginUser)

router.post('/register', registerUser)

router.patch('/update', updateUserEvents)

module.exports = router