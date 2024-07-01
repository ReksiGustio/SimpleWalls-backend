const prisma = require('../prisma/index')


//function current user
const status = async (req, res) => {
    console.log('Check user status')
    try {

        const user = await prisma.user.findUnique({
            where: {
                id: req.user?.id,
            },
            select: {
                id: true,
                userName: true,
                profile: true,
                posts: {
                    include: {
                        likes: true,
                        comments: true
                    }
                }
            },
        })

        if (!user)
            return res
                .status(404)
                .json({
                    message: `Error: User ${userName} not found`
                })
        
        res .status(200)
            .send({
            message: 'Get current user successfully',
            data: user
        })

    } catch (error) {
        console.error(new Error(error.message))
        res .status(500)
            .send({
                message: `Error: ${error}`
            })
    }
}

//function findUsers
const findUsers = async (req, res) => {
    console.log('Get all users')
    try {

        //get all users from database
        const users = await prisma.user.findMany({
            select: {
                id: true,
                userName: true
            },
        })

        //send response
        res .status(200)
            .send({
            message: 'Get all users successfully',
            data: users
        })

    } catch (error) {
        res .status(500)
            .send({
                message: `Error: ${error}`
            })
    }
}

//function findUserById
const findUserByUsername = async (req, res) => {
    console.log('Get user by id')

    //get Username from params
    const { id } = req.params

    try {

        //get user by ID
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                userName: true,
                profile: true,
                posts: (String(req.body.partial) == 'partial' 
                    ? false
                    :{ include: { 
                        likes: true, 
                        comments: {
                            select: {
                                id: true
                            }
                        }
                    } })
                }
            })

        if (!user)
            return res
                .status(404)
                .json({
                    message: `Error: ID ${id} not found`
                })

        //send response
        res .status(200)
            .send({
                message: `Get user: :${user.userName}`,
                data: user,
            })

    } catch (error) {
        res .status(500)
            .send({
                message: `Error: ${error}`
            })
    }
}

//function updateProfile
const updateProfile = async (req, res) => {
    console.log('Updating profile')

    try {

        //update user
        const profile = await prisma.profile.update({
            where: {
                userId: req.user?.id,
            },
            data: {
                name: req.body.name,
                bio: req.body.bio,
                profilePicture: req.body.profilePicture
            },
            select: {
                id: true,
                name: true,
                bio: true,
                profilePicture: true,
                userId: true
            }
        })

        //send response
        res .status(200)
            .send({
                message: 'Profile updated successfully',
                data: profile
            })

    } catch (error) {
        res .status(500)
            .send({
                message: `Error: ${error}`
            })
    }
}

//function searchUser
const searchUser = async (req, res) => {
    console.log('search user')

    try {

        //find user
        const user = await prisma.user.findMany({
            where: {
                profile: {
                    name: {
                        contains: req.body.textField,
                        mode: 'insensitive'
                    }
                }
            },
            select: {
                id: true,
                userName: true,
                profile: true,
            }
        })

        //send response
        res .status(200)
            .send({
                message: 'Search complete',
                data: user
            })

    } catch (error) {
        res .status(500)
            .send({
                message: `Error: ${error}`
            })
    }
}

module.exports = { status, findUsers, findUserByUsername, updateProfile, searchUser }