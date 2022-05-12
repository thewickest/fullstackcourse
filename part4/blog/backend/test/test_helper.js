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

const blogByTitle = async (title) => {
    return await Blog.findOne({title: title})
}

module.exports = {
    initialBlogs, blogsInDb, blogByTitle
}