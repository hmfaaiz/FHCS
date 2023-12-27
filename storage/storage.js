const multer = require("multer");
const path = require("path");
// const fs = require("fs").promises;


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadDir = (__dirname, "..", "uploads");
 
        if (file.fieldname === "profilePic") {
        cb(null, path.join(uploadDir, "profilePic"));
      } 
    
    },
  });


  module.exports = {
    storage}