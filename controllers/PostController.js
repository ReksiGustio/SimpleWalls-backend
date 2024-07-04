const prisma = require('../prisma/index')

const createPost = async (req, res) => {
    
    console.log('Creating new post')
    try {
        //insert post data
        const user = await prisma.post.create({
            data: {
                title: req.body.title,
                imageURL: req.body.imageURL,
                published: req.body.published,
                authorId: req.user.id
            }
        })

        //return response json
        res .status(201)
            .send({
                message: `Posted Successfully`
            })

    } catch (error) {
        res .status(500)
            .send({
                message: `Error: ${error}`
            })
    }
}

const findPost = async (req, res) => {
    
    console.log('Finding post')
    try {
        //finding post data
        const post = await prisma.post.findUnique({
            where: {
                id: Number(req.params.id),
            },
            select: {
                id: true,
                title: true,
                imageURL: true,
                likes: true,
                comments: { include: { likes: true } , skip: 0, take: 20 },
                createdAt: true,
                updatedAt: true,
                published: true,
                authorId: true,
                author: {
                    select: {
                        id: true,
                        userName: true,
                        profile: true
                    }
                }
            },
        })

        //return response json
        res .status(201)
            .send({
                message: `Get Post Successfully`,
                data: post
            })

    } catch (error) {
        res .status(500)
            .send({
                message: `Error: ${error}`
            })
    }
}

const findPosts = async (req, res) => {
    
    console.log('Finding posts')
    try {
        //finding post data
        const posts = await prisma.post.findMany({
            where: {
                published: true
            },
            orderBy: {
                createdAt: 'desc'
              },
            select: {
                id: true,
                title: true,
                imageURL: true,
                likes: true,
                comments: {
                    select: {
                        id: true
                    }
                },
                createdAt: true,
                updatedAt: true,
                published: true,
                authorId: true,
                author: {
                    select: {
                        id: true,
                        userName: true,
                        profile: true
                    }
                }
            },
            skip: req.body.startPoint,
            take: 20
        })

        //return response json
        res .status(201)
            .send({
                message: `Get Posts Successfully`,
                data: posts
            })

    } catch (error) {
        res .status(500)
            .send({
                message: `Error: ${error}`
            })
    }
}

const deletePost = async (req, res) => {
    
    const { id } = req.params

    console.log('delete post')
    try {
        //delete comment
        await prisma.comment.deleteMany({
            where: {
                postId: Number(id)
            }
        })

        //delete like
        await prisma.postLike.deleteMany({
            where: {
                postId: Number(id)
            }
        })

        //delete post
        await prisma.post.delete({
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

//function update post
const updatePost = async (req, res) => {
    console.log('Updating post')

    const { id } = req.params

    try {

        //update user
        const post = await prisma.post.update({
            where: {
                id: Number(id)
            },
            data: {
                title: req.body.title,
                published: req.body.published
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
            }
        })

        //send response
        res .status(200)
            .send({
                message: 'Post updated successfully',
                data: post
            })

    } catch (error) {
        res .status(500)
            .send({
                message: `Error: ${error}`
            })
    }
}

//function searchPost
const searchPost = async (req, res) => {
    console.log('search post')

    try {

        //find post
        const posts = await prisma.post.findMany({
            where: {
                title: {
                    contains: req.body.textField,
                    mode: 'insensitive'
                },
                published: true
            },
            orderBy: {
                createdAt: 'desc'
              },
            select: {
                id: true,
                title: true,
                imageURL: true,
                likes: true,
                comments: {
                    select: {
                        id: true
                    }
                },
                createdAt: true,
                updatedAt: true,
                published: true,
                authorId: true,
                author: {
                    select: {
                        id: true,
                        userName: true,
                        profile: true
                    }
                }
            },
            take: 20
        })

        //send response
        res .status(200)
            .send({
                message: 'Search complete',
                data: posts
            })

    } catch (error) {
        res .status(500)
            .send({
                message: `Error: ${error}`
            })
    }
}

module.exports = {createPost, findPost, findPosts, deletePost, updatePost, searchPost}