import FetchService from "../utils/fetch-service.js"
import ResourceError from '../errors/resource-error.js'

const PER_PAGE = 2

class UserDatabase {
    constructor() {
        this.users = []
    }
    async initialize() {
        try {
            const usersData = await FetchService.getAllUsersFromServer()
            this.users = usersData
        }
        catch {
            this.users = []
        }
    }

    getAllUsers() {
        return this.users
    }

    getPages(totalPages = Math.ceil(this.users.length / PER_PAGE)) {
        return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    getUserByPage(page) {
        const start = (page - 1) * PER_PAGE
        const end = Math.min(start + PER_PAGE, this.users.length)

        return this.users.slice(start, end)
    }
    getUserById(id) {
        const filteredUsers = this.users.filter(user => user.id == id)
        const matchedUser = filteredUsers[0]
        if (matchedUser) {
            return matchedUser
        }
        else {
            throw new ResourceError(`User with ID: ${id} not found`)
        }
    }
    deleteUser(id) {
        this.users = this.users.filter(user => user.id !== id)
    }
    updateUser(id, email, firstName, lastName) {
        const user = this.getUserById(id)
        user.setEmail(email)
        user.setFirstName(firstName)
        user.setLastName(lastName)
    }

    searchUser(searchTerm) {
        const lowerCaseSearchTerm = searchTerm.toLowerCase()
        return this.users.filter(user => {
            const fullName = user.firstName + ' ' + user.lastName
            return fullName.toLowerCase().includes(lowerCaseSearchTerm)
        })
    }
}

const database = new UserDatabase()
await database.initialize()

export default database