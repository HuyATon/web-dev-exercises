import postgresDB from './db.js'

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

    }
}