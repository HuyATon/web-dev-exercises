import express from 'express'
import calculatorController from '../controllers/calculator-controller.js'

const router = express.Router()

router.post('/', calculatorController.handleCalculation)

export default router