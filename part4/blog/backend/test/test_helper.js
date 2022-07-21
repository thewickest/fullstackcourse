const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'First Blog',
        author: 'Me',
        url: 'www.dumb.com',
        likes: 10,
        user: '62d933b6f52af34b7ad812a5'
    },
    {
        title: 'Second Blog',
        author: 'Not me',
        url: 'www.people.com',
        likes: 15,
        user: '62d933b6f52af34b7ad812a5' //User id de alex1
    }
]

const initialUsers = [
    {
        username: 'alex1',
        name: 'alex',
        passwordHash: 'alex'
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

const blogByTitle = async (title) => {
    return await Blog.findOne({title: title})
}

const userByUsername = async (username) => {
    return await User.findOne({username: username})
}

const encryptPassword = (password) => {
    const saltRounds = 10
    return bcrypt.hash(password, saltRounds)
}

module.exports = {
    initialBlogs, initialUsers, blogsInDb, usersInDb,
    blogByTitle, userByUsername, encryptPassword
} 