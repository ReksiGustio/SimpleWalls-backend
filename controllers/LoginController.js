const { validationResult } = require('express-validator')
const passport = require('passport')

//function login
const login = (req, res, next) => {
    console.log(`1 - Login handler ${JSON.stringify(req.body)}`)

    const errors = validationResult(req)
    
    if (!errors.isEmpty())
        return res
            .status(422)
            .json({
                message: 'Error 422: Validation error',
                errors: errors.array(0)
            })

    passport.authenticate('local', (err, user) => {
        console.log(`3 - Passport authenticate cb ${JSON.stringify(user)}`)

        if (err)
            return res
                .status(422)
                .send({
                    message: `Error: ${err}`
                })

        if (!user)
            return res
                .status(404)
                .json({
                    message: 'Error: Username or password is false'
                })

        req.login(user, (err) => {
            if (err)
                return next(err)

            res .status(200)
                .send({ message: `Logged in as ${user.userName}` })
        })

    })(req, res, next)
}

//function logout
const logout = (req, res, next) => {
    req.logout()
    req.session = null
    
    res .status(200)
            .send({ message: `Logout Successfully` })

}

module.exports = { login, logout }