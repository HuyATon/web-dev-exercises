class ResourceError extends Error {

    constructor(message) {
        super(message)
        this.statusCode = 404
        this.status = 'error'
    }

}

export default ResourceError