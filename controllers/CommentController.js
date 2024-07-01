const prisma = require('../prisma/index')

const newComment = async (req, res) => {
    
    const { id } = req.params

    console.log('Creating new comment')
    try {
        //insert comment data
        const comment = await prisma.comment.create({
            data: {
                text: req.body.text,
                imageURL: req.body.imageURL,
                userId: req.user.id,
                postId: Number(id)
            }
        })

        //return response json
        res .status(201)
            .send({
                message: `You commented on this post`
            })

    } catch (error) {
        res .status(500)
            .send({
                message: `Error: ${error}`
            })
    }
}

const fetchComments = async (req, res) => {
    
    console.log('Finding comments')
    try {
        //finding post data
        const comments = await prisma.comment.findMany({
            where: {
                postId: Number(req.body.id),
            },
            skip: req.body.startPoint,
            take: 20
        })

        //return response json
        res .status(201)
            .send({
                message: `Get Comments Successfully`,
                data: comments
            })

    } catch (error) {
        res .status(500)
            .send({
                message: `Error: ${error}`
            })
    }
}

const deleteComment = async (req, res) => {
    
    const { id } = req.params

    console.log('delete comment')
    try {
        //delete like
        await prisma.commentLike.deleteMany({
            where: {
                commentId: Number(id)
            }
        })

        //delete comment
        await prisma.comment.delete({
            where: {
                id: Number(id)
            }
        })

        //return response json
        res .status(201)
            .send({
                message: `Deleted Successfully`
            })
        console.log('post deleted successfully')

    } catch (error) {
        console.log(`${error}`)
        res .status(500)
            .send({
                message: `Error: ${error}`
            })
    }
}

module.exports = {newComment, fetchComments, deleteComment}