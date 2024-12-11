const passport = require('passport')
const MyLocalStrategy = require('./MyLocalStrategy.js')
const User = require('../models/User.js')
const bcrypt = require('bcrypt')

module.exports = (app) => {

    app.use(passport.initialize())
    app.use(passport.session())

    passport.use(new MyLocalStrategy(async(username, password, cb) => {
        try {
            const user = await User.one(username)

            if (!user) { return cb(null, false, 'Username does not exist') }

            const isMatch = await bcrypt.compare(password, user.Password)

            if (!isMatch) { return cb(null, false, 'Password does not match') }

            return cb(null, user)
        }
        catch (err) {
            cb(err)
        }
    }))

    passport.serializeUser((user, cb) => {
        cb(null, user.Username)
    })

    passport.deserializeUser(async (username, cb) => {
        try {
            const user = await User.one(username)
            cb(null, user)
        }
        catch (error ) { throw error }
    })
}