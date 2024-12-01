import Feedback from '../models/feedback.js'
import db from '../models/db.js'

export default {
    showFormView(req, res) {
        res.render('form')
    },
    handleFeedbackSubmission(req, res) {
        const { name, email, willAttend } = req.body
        const newFeedback = new Feedback(name, email, willAttend === undefined ? "No" : "Yes")
        db.addFeedback(newFeedback)

        res.render('thanks', {
            feedback: newFeedback
        })
    }
}