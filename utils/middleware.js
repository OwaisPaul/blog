const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
    // the base class for server-side MongoDB errors.
    // code 11000 indicates a duplicate key error e.g the username is already taken
  } else if (error.name === 'MongoServerError' && error.code === 11000) {
    return response.status(400).json({ error: 'Username must be unique' })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({error: 'token invalid'})
  }

  return response.status(500).json({ error: 'Internal server error' })

}

  const tokenExtractor = (request, response, next) => {
    // extracts the token from the authorization header and attach it to request.token
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      request.token = authorization.replace('Bearer ', '')
    } else {
      request.token = null
    }
    next()
  }
  // extracting user from token and attaching to request.user
  const userExtractor = async (request, response, next) => {
    try {
      const token = request.token
      if(!token) {
        return response.status(401).json({ error: 'token missing'})
      }

      const decodedToken = jwt.verify(token, process.env.SECRET)
      if (!decodedToken.id) {
        return response.status(401).json({error: 'token invalid'})
      }

      const user = await User.findById(decodedToken.id)
      if(!user) {
        return response.status(401).json({ error: 'user not found'})
      }
      request.user = user
      next()
    } catch (error) {
      next(error)
    }
    }
    
  
module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}