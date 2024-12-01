import express from 'express'
import usersController from '../controllers/users-controller.js'

const router = express.Router()

router.get('/', usersController.showUsers)
router.get('/:id', usersController.showUserById)
router.delete('/:id', usersController.deleteUser)
router.patch('/:id', usersController.updateUser)
router.post('/search', usersController.searchUser)
 
export default router