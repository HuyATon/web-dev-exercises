import { config } from 'dotenv'
import pgPromise from 'pg-promise'
import postgresDatabase from "../utils/db.js";

config()

class User {

    constructor(id, username, password, name, email, dob, permission) {
        this.id = id
        this.username = username
        this.password = password
        this.name = name
        this.email = email
        this.dob = dob
        this.permission = permission
    }


    // Database interactions
    toEntity() {
        return {
            "Username": this.username,
            "Password": this.password,
            "Name": this.name,
            "Email": this.email,
            "DOB": this.dob,
            "Permission": this.permission
        }
    }

    saveToDB() {
        const entity = this.toEntity()
        const tableName = postgresDatabase.generateTableName("Users")
        return postgresDatabase.add(entity, tableName)
    }

}

export default User