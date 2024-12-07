import postgresDB from './db.js'
import sha256 from "js-sha256";
import User from '../models/User.js'

const db = postgresDB.db

export default {

    didExist: async(username) => {

        try {
            const result = await db.oneOrNone(`
                SELECT * FROM ${postgresDB.schema}."Users"
                WHERE "Username" = $1`, [username])
            return result !== null
        }
        catch(error) {
            throw error
        }
    },

    getUserByUsername: async(username) => {
        try {
            const result = await db.oneOrNone(`
                SELECT * FROM ${postgresDB.schema}."Users"
                WHERE "Username" = $1
            `, [username])

            if (result === null) {
                return null
            }

            const user = new User(result.ID, result.Username, result.Password, result.Name, result.Email, result.DOB, result.Permission)
            return user
        }
        catch(error) {
            throw error
        }
    },

    generateHashedPassword: (rawPassword) => {

    const salt = new Date().getTime().toString()
    const combinedPassword = rawPassword + salt
    const hashedPassword = sha256(combinedPassword) + salt
    return hashedPassword
}
}