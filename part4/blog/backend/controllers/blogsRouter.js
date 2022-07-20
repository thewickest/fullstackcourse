const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')
const helper = require('../utils/list_helper')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', {username:1, name:1, id:1})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const {title, author, url, likes}= new Blog(request.body)
  if(likes === undefined) likes = 0
  if(title === undefined || url === undefined){
    response.status(400).json({error:"bad request"})
  }else{
    const blog = new Blog({
      title: title,
      author: author,
      url: url,
      likes: likes,
      user: user._id

    })
    const blogSaved = await blog.save()
    user.blogs = user.blogs.concat(blogSaved._id)
    await user.save()
    response.status(201).json(blogSaved)
  }
})

blogRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(request.params.id)

  if(blog.user.toString() === user.id.toString()){
    await Blog.findByIdAndRemove(request.params.id)
  }else{
    return response.status(401).json({error: 'you cant delete this blog'})
  }
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = 
    await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  response.json(updatedBlog)

})

module.exports = blogRouter