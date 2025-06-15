
const bcrypt  = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {title: 1, author: 1, url: 1})
    // .populate replaces a referenced objectId, title , author  in a document with the actual document it refers to
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const {username, name, password} = request.body

    const saltRounds = 10
    // password is not saved in the database we store the hash of the password
    // generated with the bcrypt.hash function
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User ({
        username,
        name,
        passwordHash,
    })
// if(!password || password.length < 3) {
//     return response.status(400).json({
//         error: 'Password must be at least 3 characters long'
//     })
// }
//   if(!username || username.length < 3){
//         return response.status(400).json({
//             error: 'Username must be at least 3 characters long'
//         })
//     }
    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

module.exports = usersRouter