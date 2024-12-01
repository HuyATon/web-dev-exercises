import db from '../models/db.js'

export default {

    showFeedbacksList(req, res) {
        const feedbacks = db.getAllFeedbacks()
        res.render('attendees', {
            feedbacks: feedbacks
    })
    }
}