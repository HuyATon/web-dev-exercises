import express from 'express'
import categoriesController from '../controllers/categoriesController.js'

const router = express.Router()

router.get('/', categoriesController.renderCategories)
router.get('/:id', categoriesController.renderCategory)
router.post('/', categoriesController.addCategory)

export default router