const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

const errorHandler = (err, req, res, next) => {
  let statusCode =
    err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode)
  let message = err instanceof Error ? err.message : String(err)

  // Invalid ObjectId, e.g. /api/products/undefined
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404
    message = 'Resource not found'
  }

  // Upload errors, e.g. file too large or unexpected field
  if (err.name === 'MulterError') {
    statusCode = 400
  }

  // Missing or invalid fields
  if (err.name === 'ValidationError') {
    statusCode = 400
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ')
  }

  // Unique index violation, e.g. email already in use
  if (err.code === 11000) {
    statusCode = 400
    message = `${Object.keys(err.keyValue || {}).join(', ') || 'Value'} already exists`
  }

  if (statusCode >= 500) {
    console.error(err)
  }

  res.status(statusCode)
  res.json({
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

export { notFound, errorHandler }
