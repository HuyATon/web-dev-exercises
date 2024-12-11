const initOptions = {
    capSQL: true
}
const pgp = require('pg-promise')(initOptions)
require('dotenv').config()

const connection = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}

const db = pgp(connection)
const schema = process.env.DB_SCHEMA || "public"

module.exports = {
    pgp,
    all: async(tableNameObj) => {
        try {
            return await db.any(`SELECT * FROM ${tableNameObj} `)
        }
        catch (error) {
            throw error
        }
    },
    conditionalAll: async(tableNameObj, conditions) => {
        try {
            const query = `SELECT * FROM ${tableNameObj} WHERE ${conditions}`
            return await db.any(query)
        }
        catch (error) {
            throw error
        }
    },
    add: async(entity, tableNameObj, columns = null) => {
         try {
             var query = pgp.helpers.insert(entity, columns, tableNameObj)
             query += " RETURNING * "
             return await db.oneOrNone(query)
         }
         catch (error) {
             throw error
         }
    },
    updateOne: async (data, updateColumns, tableNameObj, condition) => {
        try {
            const query = pgp.helpers.update(data, updateColumns, tableNameObj) + `WHERE ${condition} RETURNING * `
            const result = await db.oneOrNone(query)
        }
        catch (error) {
            throw error
        }
    },
    delete: async (tableNameObj, condition)  => {
        try {
            const query = `DELETE FROM ${tableNameObj} WHERE ${condition} RETURNING *`
            return await db.query(query)
        }
        catch (error) {
            throw error
        }
    }
}
