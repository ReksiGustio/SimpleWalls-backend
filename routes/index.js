const express = require('express')
const router = express.Router()

const registerController = require('../controllers/RegisterController')
const loginController = require('../controllers/LoginController')
const userController = require('../controllers/UserController')
const fileController = require('../controllers/FileController')
const postController = require('../controllers/PostController')
const likeController = require('../controllers/LikeController')
const commentController = require('../controllers/CommentController')
const { uploadProfile, uploadPost, uploadComment } = require('../controllers/FileController')

const { validateRegister, validateLogin, authenticate } = require('../middlewares/validators')

//define route
router.post('/register', validateRegister, registerController.register)
router.post('/login', validateLogin, loginController.login)

router.use(authenticate)

router.post('/logout', loginController.logout)
router.get('/user/status', userController.status)
router.put('/user/update', userController.updateProfile)
router.get('/users', userController.findUsers)
router.post('/users/search', userController.searchUser)
router.get('/users/:id', userController.findUserByUsername)
router.post('/users/:id', userController.findUserByUsername)

router.post('/post', postController.createPost)
router.post('/posts', postController.findPosts)
router.post('/posts/search', postController.searchPost)
router.get('/post/:id', postController.findPost)
router.put('/post/:id', postController.updatePost)
router.delete('/post/:id', postController.deletePost)
router.post('/post/like/:id', likeController.likePost)
router.delete('/post/like/:id', likeController.unlikePost)


router.get('/comments', commentController.fetchComments)
router.post('/comment/:id', commentController.newComment)
router.delete('/comment/:id', commentController.deleteComment)
router.post('/comment/like/:id', likeController.likeComment)
router.delete('/comment/like/:id', likeController.unlikeComment)

router.post('/upload/profile/:userId', uploadProfile, fileController.uploadFile)
router.post('/upload/post/:postId', uploadPost, fileController.uploadFile)
router.post('/upload/comment/:commentId', uploadComment, fileController.uploadFile)

//export router
module.exports = router