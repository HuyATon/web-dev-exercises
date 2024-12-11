const express = require('express')
const userC = require('../controllers/userC.js')
const passport = require('passport')
const router = express.Router()

router.get('/register', userC.loadRegister)
router.get('/login', userC.loadLogin)


router.post('/register', userC.register)
router.post('/login', passport.authenticate('MyLocalStrategy', {
    failureRedirect: '/login',
    successRedirect: '/admin'
}))


module.exports = router