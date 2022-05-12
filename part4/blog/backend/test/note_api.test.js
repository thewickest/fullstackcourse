const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const firstBlog = require('../utils/list_helper').firstBlog
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

    /**Count the blogs */
    test('GET: count blogs', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    /**Check de name of de identifier. Must be 'id' */
    test('ID: Check unique identifier name', async () => {
        const fBlog = await firstBlog(await helper.blogsInDb())
        expect(fBlog.id).toBeDefined()
        
    })
})

/**AFTER TESTS */
afterAll(() => {
    mongoose.connection.close()
})