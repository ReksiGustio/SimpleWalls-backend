const prisma = require('../prisma/index')

const followUser = async (req, res) => {
    console.log('Following user')

    const { id } = req.params

    try {
        //follow user
        const follow = await prisma.following.create({
            data: {
                id: Number(id),
                displayName: req.body.displayName,
                imageURL: req.body.imageURL,
                userId: req.user?.id
            }
        })

        //target user side
        await prisma.follower.create({
            data: {
                id: req.user?.id,
                displayName: req.user?.profile?.name,
                imageURL: req.user?.profile?.profilePicture,
                userId: Number(id)
            }
        })

        //return response json
        res .status(201)
            .send({
                message: `You followed ${req.body.displayName}`,
                data: follow
            })
        console.log('follow successfully')

    } catch (error) {
        console.log(`${error}`)
        res .status(500)
            .send({
                message: `Error: ${error}`
            })
    }
}

const unfollowUser = async (req, res) => {
    
    const { id } = req.params

    console.log('unfollow user')
    try {
        //unfollow user
        await prisma.following.delete({
            where: {
                id: Number(id),
                userId: req.user.id
            }
        })

        //target user side
        await prisma.follower.delete({
            where: {
                id: req.user.id,
                userId: Number(id)
            }
        })

        //return response json
        res .status(201)
            .send({
                message: `Unfollow successfully`,
            })
        console.log('unlike successfully')

    } catch (error) {
        console.log(`${error}`)
        res .status(500)
            .send({
                message: `Error: ${error}`
            })
    }
}

module.exports = {followUser, unfollowUser}