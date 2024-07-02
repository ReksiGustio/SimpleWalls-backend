const express = require('express')
const multer = require('multer')

//store to uploads/profile folder
const profileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/profile')
    },
    filename: function (req, file, cb) {
        const { userId } = req.params
  
        var getFileExt = function(fileName){
          var fileExt = fileName.split(".");
          if (fileExt.length === 1 || ( fileExt[0] === "" && fileExt.length === 2)) {
            return "";
          }
          return fileExt.pop();
        }
        cb(null, 'userId' + '-' + String(userId) + '-' + file.fieldname + '.' + getFileExt(file.originalname))
    }
  })

//store to uploads/post folder
const postStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/post')
  },
  filename: function (req, file, cb) {
      const postId = req.params.postId

      var getFileExt = function(fileName){
        var fileExt = fileName.split(".");
        if (fileExt.length === 1 || ( fileExt[0] === "" && fileExt.length === 2)) {
          return "";
        }
        return fileExt.pop();
      }
      cb(null, 'postId' + '-' + String(postId) + '-' + file.fieldname + '.' + getFileExt(file.originalname))
  }
})

//store to uploads/comment folder
const commentStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/comment')
  },
  filename: function (req, file, cb) {
      const commentId = req.params.commentId

      var getFileExt = function(fileName){
        var fileExt = fileName.split(".");
        if (fileExt.length === 1 || ( fileExt[0] === "" && fileExt.length === 2)) {
          return "";
        }
        return fileExt.pop();
      }
      cb(null, 'commentId' + '-' + String(commentId) + '-' + file.fieldname + '.' + getFileExt(file.originalname))
  }
})

const uploadProfileStorage = multer( { storage: profileStorage } )
const uploadPostStorage = multer( { storage: postStorage } )
const uploadCommentStorage = multer( { storage: commentStorage } )

const uploadProfile = uploadProfileStorage.single('profile_pic')
const uploadPost = uploadPostStorage.single('post_pic')
const uploadComment = uploadCommentStorage.single('comment_pic')

const uploadFile = (req, res) => {res.json(req.file)}

module.exports = { uploadProfile, uploadPost, uploadComment,  uploadFile }