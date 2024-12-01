import database from '../config/database.js'

export default {

    showUsers(req, res) {
        const page = req.query.page || 1
        const users = database.getUserByPage(page)
        const pages = database.getPages()

        res.render('home', { users, pages, page })
    },

    showUserById(req, res, next) {
        try {
            const id = parseInt(req.params.id)
            const matchedUser = database.getUserById(id)
            res.render('user-detail', { 
                user: matchedUser 
            })
        }
        catch (error) {
            next(error)
        }
    },

    deleteUser(req, res, next) {
        const userID = parseInt(req.params.id)
        database.deleteUser(userID)
        // go to the home page
        res.status(200).json({
            message: 'User deleted successfully'
        })
    },

    updateUser(req, res, next) {
        const { email, firstName, lastName } = req.body
        database.updateUser(req.params.id, email, firstName, lastName)
        
        res.status(200).json({
            message: 'User updated successfully'
        })
    },

    searchUser(req, res) {
        const  searchTerm  = req.body.searchTerm
       
        const matchedUsers = database.searchUser(searchTerm) || []
        res.render('home', { 
            users: matchedUsers
         })
    }
    
}

