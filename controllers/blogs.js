// this is for the route handling

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
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

blogsRouter.post('/', (request, response, next) => {
    const body = request.body

    const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes ?? 0, // this sets default to 0 if likes are absent undefined
           })

    blog.save()
        .then(savedBlog => {
            response.status(201).json(savedBlog)
        })
        .catch(error => next(error))
    })

    blogsRouter.delete('/:id', (request, response, next) => {
        Blog.findByIdAndDelete(request.params.id)
          .then(() => {
            response.status(204).end()
          })
          .catch(error => next(error))
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