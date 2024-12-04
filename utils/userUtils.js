import postgresDB from './db.js'
import sha256 from "js-sha256";

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

            return result
        }
        catch(error) {
            throw error
        }
    },

    generateHashedPassword: (rawPassword) => {

    const salt = new Date().getTime().toString()
    const hashedSalt = sha256(salt)
    const hashedPassword = sha256(rawPassword) + hashedSalt
    const combinedPassword = hashedPassword + hashedSalt
    return combinedPassword
}
}