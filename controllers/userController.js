import User from '../models/User.js'
import userUtils from '../utils/userUtils.js'
import postgresDB from '../utils/db.js'
import sha256 from 'js-sha256'
import AuthError from '../errors/AuthError.js'
 
function generateHashedPassword(rawPassword) {

    const salt = new Date().getTime().toString()
    const hashedSalt = sha256(salt)
    const hashedPassword = sha256(rawPassword) + hashedSalt
    const combinedPassword = hashedPassword + hashedSalt
    return combinedPassword
}

export default {

    async renderLogin(req, res) {
        res.render('login')
    },

    async renderRegister(req, res) {
        res.render('register')
    },

    async register(req, res, next) {
        try {
            const {username, password} = req.body
            const hashedPassword = generateHashedPassword(password)
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
            res.send(result)
        }
        catch(error) {
            console.log(error)
        }
    },

    
}