import { config } from 'dotenv'
import pgPromise from 'pg-promise'

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

}

export default User