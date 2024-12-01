let feedbacks = []

export default { 

    getAllFeedbacks() {
        return feedbacks
    },

    addFeedback(feedback) {
        feedbacks.push(feedback)
    }
}