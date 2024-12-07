import express from 'express'
import categoriesController from '../controllers/categoriesController.js'

const router = express.Router()

router.get('/', categoriesController.renderCategories)
router.get('/:id', categoriesController.renderCategory)
router.post('/', categoriesController.addCategory)
router.patch('/:id', categoriesController.updateCategory)
router.delete('/:id', categoriesController.deleteCategory)

export default router