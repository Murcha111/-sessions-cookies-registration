const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb){
    cb(null, 'images/')
  },

  filename(req, file, cb){
  cb(null, Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5) + '-'+ file.originalname )
  // cb(null, Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5) + '.jpg' )
  }
})

const types = ['image/png', 'image/jpeg', 'image/jpg'];

const fileFilter = (req, file, cb)=> {
  if(types.includes(file.mimetype)){
  cb(null, true)
  } else {
  cb(null, false)  
  }
}

module.exports = multer({storage,fileFilter });
