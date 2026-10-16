import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    let decoded
    try {
      token = req.headers.authorization.split(' ')[1]
      decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }

    req.user = await User.findById(decoded.id).select('-password')

    // Token is valid but the user no longer exists (e.g. after re-seeding the DB)
    if (!req.user) {
      res.status(401)
      throw new Error('Not authorized, user not found')
    }

    return next()
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}

export { protect, admin }
