const express = require('express')
const multer = require('multer')

//store to uploads/profile folder
const profileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/profile')
    },
    filename: function (req, file, cb) {
        const { userName } = req.params
  
        var getFileExt = function(fileName){
          var fileExt = fileName.split(".");
          if (fileExt.length === 1 || ( fileExt[0] === "" && fileExt.length === 2)) {
            return "";
          }
          return fileExt.pop();
        }
        cb(null, String(userName) + '-' + file.fieldname + '.' + getFileExt(file.originalname))
    }
  })

//store to uploads/message folder
const messageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/message')
  },
  filename: function (req, file, cb) {
      const sender = req.params.sender
      const receiver = req.params.receiver
      const id = req.params.id

      var getFileExt = function(fileName){
        var fileExt = fileName.split(".");
        if (fileExt.length === 1 || ( fileExt[0] === "" && fileExt.length === 2)) {
          return "";
        }
        return fileExt.pop();
      }
      cb(null, String(sender) + '-' + String(receiver) + '-' + String(id) + '-' + file.fieldname + '.' + getFileExt(file.originalname))
  }
})

const uploadProfileStorage = multer( { storage: profileStorage } )
const uploadMessageStorage = multer( { storage: messageStorage } )

const uploadProfile = uploadProfileStorage.single('profile_pic')
const uploadMessage = uploadMessageStorage.single('message_pic')

const profilePath = express.static(__dirname+ '/uploads/profile')
const messagePath = express.static(__dirname+ '/uploads/message')

const uploadFile = (req, res) => {res.json(req.file)}

module.exports = { uploadProfile, uploadMessage, profilePath, messagePath, uploadFile }