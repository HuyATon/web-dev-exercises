const { Strategy } = require('passport-strategy')
const passport = require('passport')


module.exports = class MyLocalStrategy extends Strategy {

    constructor(verify) {
        super()
        this.name = 'MyLocalStrategy'
        this.verify = verify

        passport.strategies[this.name] = this
    }

    async authenticate(req, options) {
        try {
            const { username, password } = req.body
            await this.verify(username, password, (err, user, info) => {
                if (err) return this.error(err)
                if (!user) return this.fail(info || 'Authentication failed.')
                this.success(user)
            })
        }
        catch (error) {
            throw error
        }
    }
}