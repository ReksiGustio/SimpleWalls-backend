const { body } = require('express-validator');
const prisma = require('../prisma/index');

// register validation
const validateRegister = [
    body('userName')
        .notEmpty()
        .withMessage('Username is required')
        .isLength({ min: 3 })
        .withMessage('Username must be at least 3 characters long')
        .custom(async (value) => {
            if (!value)
                throw new Error('Username is required')
            
            if (/\s/.test(value))
                throw new Error('Username cannot contains whitespaces')

            const user = await prisma.user.findUnique({ where: { userName: value } })
            if (user)
                throw new Error('Username already exists')

            return true
        }),

    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
];

//login validation
const validateLogin = [
    body('username')
        .notEmpty()
        .withMessage('Username is required')
        .isLength({ min: 3 })
        .withMessage('Username must be at least 3 characters long'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
];

//authenticate before request
const authenticate = (req, res, next) => {
    console.log(`Authenticating`)

    if (!req.isAuthenticated()) {
        console.log(`failed`)
        return res
            .status(403)
            .send({ message: 'Unauthorized access, please login'})
    }
    
    console.log(`success`)
    next()
}

module.exports = { validateRegister, validateLogin, authenticate }