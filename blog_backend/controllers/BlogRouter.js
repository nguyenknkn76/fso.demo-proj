const blogRouter = require('express').Router()
const Blog = require("../models/BlogModel")

blogRouter.get('/',  async (request, response, next) => {
    const blogs = await Blog.find({})
    response.json(blogs)
  })
  
blogRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)
  await blog.save()
  response.status(201).json(blog)
})

module.exports = blogRouter