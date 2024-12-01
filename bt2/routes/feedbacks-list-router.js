import express from 'express'
import feedbackListController from '../controllers/feedbacks-list-controller.js'
const router = express.Router()

router.get('/', feedbackListController.showFeedbacksList)

export default router