const prisma = require('../prisma/index')

const likePost = async (req, res) => {
    
    console.log('Like post')
    try {
        //add like to post
        const like = await prisma.postLike.create({
            data: {
                displayName: req.body.displayName,
                postId: Number(req.params.id),
                userId: req.user?.id
            }
        })

        const post = await prisma.post.findUnique({
            where: {
                id: Number(req.params.id),
            },
            select: {
                id: true,
                title: true,
                imageURL: true,
                likes: true,
                comments: true,
                createdAt: true,
                updatedAt: true,
                published: true,
                authorId: true
            },
        })

        //return response json
        res .status(201)
            .send({
                message: `You liked this post`,
                data: post
            })
        console.log('like successfully')

    } catch (error) {
        console.log(`${error}`)
        res .status(500)
            .send({
                message: `Error: ${error}`
            })
    }
}

const unlikePost = async (req, res) => {
    
    console.log('unike post')
    try {
        //delete like post
        const like = await prisma.postLike.delete({
            where: {
                postId_userId: {
                    postId: Number(req.params.id),
                    userId: req.user.id
                }
            }
        })

        const post = await prisma.post.findUnique({
            where: {
                id: Number(req.params.id),
            },
            select: {
                id: true,
                title: true,
                imageURL: true,
                likes: true,
                comments: true,
                createdAt: true,
                updatedAt: true,
                published: true,
                authorId: true
            },
        })

        //return response json
        res .status(201)
            .send({
                message: `Cancelled like post`,
                data: post
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

const likeComment = async (req, res) => {
    
    console.log('Like comment')
    try {
        //add like to comment
        await prisma.commentLike.create({
            data: {
                displayName: req.body.displayName,
                commentId: Number(req.params.id),
                userId: req.user?.id
            }
        })

        const comment = await prisma.comment.findUnique({
            where: {
                id: Number(req.params.id),
            },
            select: {
                id: true,
                text: true,
                imageURL: true,
                likes: true,
                createdAt: true,
                updatedAt: true,
                userId: true,
                postId: true
            },
        })

        //return response json
        res .status(201)
            .send({
                message: `You liked this comment`,
                data: comment
            })
        console.log('like successfully')

    } catch (error) {
        console.log(`${error}`)
        res .status(500)
            .send({
                message: `Error: ${error}`
            })
    }
}

const unlikeComment = async (req, res) => {
    
    console.log('Unlike comment')
    try {
        //add like to comment
        await prisma.commentLike.delete({
            where: {
                commentId_userId: {
                    commentId: Number(req.params.id),
                    userId: req.user.id
                }
            }
        })

        const comment = await prisma.comment.findUnique({
            where: {
                id: Number(req.params.id),
            },
            select: {
                id: true,
                text: true,
                imageURL: true,
                likes: true,
                createdAt: true,
                updatedAt: true,
                userId: true,
                postId: true
            },
        })

        //return response json
        res .status(201)
            .send({
                message: `Cancelled like comment`,
                data: comment
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

module.exports = {likePost, unlikePost, likeComment, unlikeComment}