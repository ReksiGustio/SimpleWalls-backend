const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const prisma = require('../prisma/index')

const register = async (req, res) => {
    
    const errors = validationResult(req)

    if (!errors.isEmpty())
        return res
            .status(422)
            .json({
                message: `Error: Validation error`,
                data: errors.array(0)
            })

    //hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    
    console.log('Registering new user')
    try {
        //insert user data
        const user = await prisma.user.create({
            data: {
                userName: req.body.userName,
                password: hashedPassword
            }
        })

        //insert profile
        await prisma.profile.create({
            data: {
                name: req.body.name,
                userId: user.id
            }
        })

        //return response json
        res .status(201)
            .send({
                message: `User ${req.body.userName} Registered successfully`
            })

    } catch (error) {
        res .status(500)
            .send({
                message: `Error: ${error}`
            })
    }
}

module.exports = {register}