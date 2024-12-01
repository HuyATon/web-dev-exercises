class NetworkingError extends Error {

    constructor(message) {
        super(message)
        this.statusCode = 500
        this.status = 'error'
    }
}

export default NetworkingError