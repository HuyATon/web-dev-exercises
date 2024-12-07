import User from '../models/User.js'
import userUtils from '../utils/userUtils.js'
import sha256 from 'js-sha256'
import AuthError from '../errors/AuthError.js'



export default {

    renderLogin: async (req, res) => {
        res.render('login')
    },

    renderRegister: async (req, res) => {
        res.render('register')
    },

    register: async (req, res, next) => {
        try {
            const {username, password, name, email, dob } = req.body
            const hashedPassword = userUtils.generateHashedPassword(password)
            const DEFAULT_PERMISSION = 1
            const user = new User(null, username, hashedPassword, name, email, dob, DEFAULT_PERMISSION)

            const didUserExist = await userUtils.didExist(username)
            if (didUserExist) {
                const authError = new AuthError('Username already exists')
                next(authError)
                return
            }
            const result = user.saveToDB()
            req.session.isLoggedIn = true
            res.redirect('/categories')
        }
        catch(error) {
            next(error)
        }
    },

    login: async (req, res, next) => {
        try {
            const { username, password } = req.body
            const storedUser = await userUtils.getUserByUsername(username)
            if (!storedUser) {
                const notRegisteredError =  new AuthError("User is not registered")
                next(notRegisteredError)
                return
            }
           
            const storedCombinedPassword = storedUser.password
            const storedHashedPassword = storedCombinedPassword.slice(0, 64)
            const salt = storedCombinedPassword.slice(64, storedCombinedPassword.length)
            const hashedPassword = sha256(password + salt)

            if (hashedPassword !== storedHashedPassword) {
                const passwordUnmatchedError = new AuthError('Passwords do not match')
                next(passwordUnmatchedError)
                return
            }
            req.session.isLoggedIn = true
            res.redirect('/categories')
        }
        catch (error) {
            next(error)
        }
    },

    logout: async(req, res, next) => {
        try {
            await req.session.destroy()
            res.redirect('/auth/login')
        }
        catch (error) {
            next(error)
        }
    }

    
}