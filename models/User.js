require('dotenv').config();
const db = require('../configs/db.js')
const dbUtils = require('../utils/db_utils.js')

const userTableName = dbUtils.generateTableName("Users")

module.exports = {

    didExist: async(username) => {
        try {
            const condition = `"Username" = '${username}'`
            const result = await db.conditionalAll(userTableName, condition)
            return result.length !== 0
        }
        catch (error) {
            throw error
        }
    },
    add: async(entity) => {
        try {
            const result = await db.add(entity, userTableName)
        }
        catch (error) {
            throw error
        }
    },
    one: async(username) => {
        try {
            const user = await db.oneById(userTableName, "Username", username)
            return user
        }
        catch (error) { throw error}
    }
}