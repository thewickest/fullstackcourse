const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

/**BEFORE TESTS */
beforeEach(async () => {
    await Blog.deleteMany({})

    const blogs = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseBlogs = blogs.map(blog => blog.save())
    await Promise.all(promiseBlogs)
})


/** TESTS*/
describe('api tests', () => {
    test('GET: count blogs', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
})

/**AFTER TESTS */
afterAll(() => {
    mongoose.connection.close()
})