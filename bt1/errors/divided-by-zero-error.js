class DividedByZeroError extends Error {
    constructor(message) {
        super(message)
        this.code = 400
        this.name = "DividedByZeroError"
    }
}

export default DividedByZeroError