const multer = require('multer')

// Allowed file formats
const allowedFormats = [
  /* Images */
  'image/jpeg',
  'image/png',
  'image/jpg',
]

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)

    let extArray = file.mimetype.split('/')
    let extension = extArray[extArray.length - 1]

    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension)
  },
})

const fileFilter = (req, file, cb) => {
  if (allowedFormats.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb('format of file is not valid', false)
  }
}

const limitFileSize = { fileSize: 1024 * 1024 * 5 }

const uploadConfig = { storage: storage, fileFilter: fileFilter, limits: limitFileSize }
const upload = multer(uploadConfig)

module.exports = upload