const db = require('../configs/db.js')

module.exports = {
    generateTableName: (table, schema) => {
        return new db.pgp.helpers.TableName({
            table: table,
            schema: schema
        })
    }
}