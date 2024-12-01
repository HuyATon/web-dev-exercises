import express from 'express'
import feedbackFormController from '../controllers/feedback-form-controller.js'

const router = express.Router()

router.get('/', feedbackFormController.showFormView)
router.post('/', feedbackFormController.handleFeedbackSubmission)

export default router