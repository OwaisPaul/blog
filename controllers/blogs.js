// this is for the route handling

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const logger = require('../utils/logger')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    // used .populate to join blog data with user info
            .populate('user', {username: 1, name: 1}) //this only returns username and name

        response.json(blogs)
    })

blogsRouter.get('/:id', (request, response, next) => {
    Blog.findById(request.params.id)
    .then(blog => {
        if(blog){
            response.json(blog)
        } else {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
})


blogsRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body
// the validity of token is checked with jwt.verify
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
      // if the object decoded from the token does not contain the user's identity
    if (!decodedToken.id) {
        return response.status(401).json({
            error: 'token invalid'
        })
    }
     if (!body.title || !body.url) {
        return response.status(400).json({error: 'title or url missing'})
    }
    //this finds the user
    const user = await User.findById(decodedToken.id)
    // //this finds the first user
    // const users = await User.find({})
    // const user = users[0] // first user

    if (!user) {
        return response.status(400).json({ error: 'No user found'})
    }

    const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes ?? 0, // this sets default to 0 if likes are absent undefined
            user: user._id // links blog with user
           })

           const savedBlog = await blog.save()
           // updating the user's blogs array
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.status(201).json(savedBlog)
        } catch(error) {
            logger.error('Error creating blog')
            next(error)
        }
    })
   // the following is used to delete a single resource
    blogsRouter.delete('/:id', async (request, response) => {
  try {
    // verifies the token to get the decodedToken
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid'})
    }
    // fetching blog id from the database
    const blog = await Blog.findById(request.params.id)

    if(!blog) {
        return response.status(404).json({ error: 'blog not found' })
    }

    // we will convert blog.user which is an obj to a string to compare with token id
    if (blog.user.toString() !== decodedToken.id.toString())
        return response.status(401).json( {error: 'unauthorized: you are not the creator'})

    
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()

} catch (error) {
    next(error)
}
})


    blogsRouter.put('/:id', (request, response, next) => {
        const { title, author, url, likes} = request.body

        Blog.findById(request.params.id)
        .then(blog => {
            if(!blog) {
                return response.status(404).end()
            }
            blog.title = title
            blog.author = author
            blog.url = url
            blog.likes = likes

            return blog.save().then((updatedBlog) => {
                response.json(updatedBlog)
            })
        })
        .catch(error => next(error))
    })

    module.exports = blogsRouter