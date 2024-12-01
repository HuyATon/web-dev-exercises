import axios from 'axios'
import NetworkingError from '../errors/networking-error.js'
import User from '../models/User.js'

const BASE_URL = 'https://reqres.in/api'

class FetchService {

    static async getAllUsersFromServer() {
        var users = []
            try {
                const response = await axios.get(BASE_URL + '/users')
            const data = response.data
            const total_pages = data.total_pages

            for (let i = 1; i <= total_pages; i++) {
                const url = BASE_URL + '/users?page=' + i
                const result = await axios.get(url)
                const fetchedUsers = result.data.data

                fetchedUsers.forEach(userData => {
                    const newUser = User.createFromJson(userData)
                    users.push(newUser)
                })
            }
            return users
        }
        catch {
            throw new NetworkingError('Error fetching users from reqres.in')
        }
    }

}

export default FetchService