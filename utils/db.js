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
            const result = await db.many(`SELECT * FROM ${this.schema}."${table}" `)
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

}

const postgresDatabase = new Database(env.DB_SCHEMA, db)

export default postgresDatabase