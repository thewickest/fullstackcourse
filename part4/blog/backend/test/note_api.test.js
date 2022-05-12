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

    test('POST: Correct insert', async () => {
        const newBlog = {
            title: 'test',
            author: 'test',
            url: 'test',
            likes: 0
        }

        await api.post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const totalBlogs = await helper.blogsInDb()
        expect(totalBlogs).toHaveLength(helper.initialBlogs.length+1)

        const contents = totalBlogs.map(b => b.title)
        expect(contents).toContain('test')
        
    })

    test('POST: Correct likes field', async () => {
        const newBlog = {
            title: 'test',
            author: 'test',
            url: 'test'
        }

        await api.post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const savedBlog = await helper.blogByTitle('test')
        expect(savedBlog.likes).toBeDefined()
        expect(savedBlog.likes).toEqual(0)
        
        
    })
})

/**AFTER TESTS */
afterAll(() => {
    mongoose.connection.close()
})