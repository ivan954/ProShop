import path from 'path'
import express from 'express'
import multer from 'multer'
import { uploadsDir } from '../config/paths.js'
const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadsDir)
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    const error = new Error('Images only!')
    error.statusCode = 400
    cb(error)
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    res.status(400)
    throw new Error('No image uploaded')
  }
  res.send(`/uploads/${req.file.filename}`)
})

export default router
