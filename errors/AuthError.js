class AuthError extends Error {
    constructor(message) {
        super(message);
        this.name = 'Authentication Error'
        this.status = 401
    }
}

export default AuthError