const initOptions = {
    capSQL: true
}
import pgPromise from'pg-promise'
import { config } from 'dotenv'

config()
const env = process.env

const pgp = pgPromise(initOptions)

const db = pgp({
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: 'QLBH',
    user: env.DB_USER,
    password: env.DB_PASSWORD
})

class Database {
    constructor(schema, db) {
        this.schema = schema
        this.db = db
    }

    generateTableName(table) {
        return new pgp.helpers.TableName({
            table: table,
            schema: this.schema
        })
    }

    async all(table) {
        try {
            const result = await db.manyOrNone(`SELECT * FROM ${this.schema}."${table}" `)
            return result
        }
        catch (error) {
            throw error
        }
    }

    async add(entity, tableName, columns = null) {
        try {
            var query = pgp.helpers.insert(entity, columns, tableName)
            query += " RETURNING *"
            const result = await db.oneOrNone(query)
            return result
        }
        catch (error) {
            throw error
        }
    }

    async updateOne(data, updateColumns, tableName, condition) {
        const query = pgp.helpers.update(data, updateColumns, tableName) + `WHERE ${condition} RETURNING * `
        const result = await db.oneOrNone(query)
    }

    async delete(tableName, condition) {
        const query = `DELETE FROM ${tableName} WHERE ${condition}`
        const result = await db.query(query)
    }

    async oneByField(field, fieldValue, tableName) {
        try {
            const result = await db.oneOrNone(`
                SELECT * 
                FROM ${tableName}
                WHERE "${field}" = $1
            `, [fieldValue])
            return result //
        }
        catch (error) {
            throw error
        }
    }

    async allByField(field, fieldValue, tableName) {
        try {
            const query = `
            SELECT * FROM ${tableName}
            WHERE "${field}" = ${fieldValue}
            `
            // const result = await db.manyOrNone(`
            // SELECT *
            // FROM ${tableName}
            // WHERE "${field}" = $1
            // `, [fieldValue])
            const result = await db.manyOrNone(query)
            return result
        }
        catch (error) {
            throw error
        }
    }

}

const postgresDatabase = new Database(env.DB_SCHEMA, db)

export default postgresDatabase