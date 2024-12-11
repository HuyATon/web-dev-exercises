const User = require('../models/user')
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 10

module.exports = {

    loadRegister: async(req, res) => {
        res.render('register')
    },
    loadLogin: async(req, res) => {
        res.render('login')
    },
    register: async(req, res, next) => {
        try {
            const { username, password, name, email, dob } = req.body

            const didExist = await User.didExist(username)

            if (didExist) {
                res.send("User already exists")
                return
            }
            bcrypt.hash(password, SALT_ROUNDS, async (err, hashPw) => {
                if (err) return next(err)
                const result = await User.add( {
                    "Username": username,
                    "Password": hashPw,
                    "Email": email,
                    "Name": name,
                    "DOB": dob,
                    "Permission": 1 // default
                })

            })
            res.send("Successfully Registered")
        }
        catch (error) {
            next(error)
        }
    }
}