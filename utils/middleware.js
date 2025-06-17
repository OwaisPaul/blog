const logger = require('./logger')

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
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      request.token = authorization.replace('Bearer ', '')
    } else {
      request.token = null
    }
    next()
  }


module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
}