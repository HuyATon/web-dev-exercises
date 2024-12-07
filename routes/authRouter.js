import express from 'express'
import userController from '../controllers/userController.js'

const router = express.Router()

router.get('/register', userController.renderRegister)
router.post('/register', userController.register)
router.get('/login', userController.renderLogin)
router.post('/login', userController.login)
router.get('/logout', userController.logout)

export default router