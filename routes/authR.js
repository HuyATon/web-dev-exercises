const express = require('express')
const userC = require('../controllers/userC.js')

const router = express.Router()

router.get('/register', userC.loadRegister)
router.post('/register', userC.register)

router.get('/login', userC.loadLogin)

// router.get('/login', userController.renderLogin)
// router.post('/login', userController.login)
// router.get('/logout', userController.logout)

module.exports = router