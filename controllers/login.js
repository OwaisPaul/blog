
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  try {
    const { username, password } = request.body
    // checks the user in database
    const user = await User.findOne({ username })

    // Check if user exists and password is correct
    const passwordCorrect = user
      ? await bcrypt.compare(password, user.passwordHash)
      : false

    if (!user || !passwordCorrect) {
      return response.status(401).json({ error: 'invalid username or password' })
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    response.status(200).send({ token, username: user.username, name: user.name })

  } catch (error) {
    console.error('Login error:', error)
    response.status(500).json({ error: 'internal server error' })
  }
})


module.exports = loginRouter