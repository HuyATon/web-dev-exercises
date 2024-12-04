import User from '../models/User.js'
import userUtils from '../utils/userUtils.js'
import postgresDB from '../utils/db.js'
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
            const {username, password} = req.body
            const hashedPassword = userUtils.generateHashedPassword(password)
            const user = new User(null, username, hashedPassword, "John Doe", "@example.com", new Date().toISOString().split('T')[0], 1)
            const entity = user.toEntity()
            const tableName = postgresDB.generateTableName('Users')

            const didUserExist = await userUtils.didExist(username)
            if (didUserExist) {
                const authError = new AuthError('Username already exists')
                next(authError)
                return
            }
            const result = await postgresDB.add(entity, tableName)
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
            const hashedPassword = sha256(password)
            const storedHashedPassword = storedUser.Password.slice(0, 64)
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
    }

    
}