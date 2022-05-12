const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'First Blog',
        author: 'Me',
        url: 'www.dumb.com',
        likes: 10
    },
    {
        title: 'Second Blog',
        author: 'Not me',
        url: 'www.people.com',
        likes: 15
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb
}