const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const firstBlog = require('../utils/list_helper').firstBlog
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

/**BEFORE TESTS */
beforeEach(async () => {
    /**Inital Blogs */
    await Blog.deleteMany({})
    const blogs = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseBlogs = blogs.map(blog => blog.save())
    await Promise.all(promiseBlogs)
})

const token = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsZXgxIiwiaWQiOiI2MmQ5MzNiNmY1MmFmMzRiN2FkODEyYTUiLCJpYXQiOjE2NTg0MDE3NTAsImV4cCI6MTY1ODQwNTM1MH0.d7GNzMa--A19iurUFJR6nbRbmLDLzSdFgHLvNGaCFnY'

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
            .set('Authorization',token)
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
            .set('Authorization',token)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const savedBlog = await helper.blogByTitle('test')
        expect(savedBlog.likes).toBeDefined()
        expect(savedBlog.likes).toEqual(0)
        
        
    })

    test('POST: Error title and url', async () => {
        const newBlog = {
            author: 'test',
            likes: 5
        }

        await api.post('/api/blogs')
            .set('Authorization',token)
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('POST: Bad token', async () => {
        const newBlog = {
            author: 'test',
            likes: 5
        }

        await api.post('/api/blogs')
            .set('Authorization','bearer 0123')
            .send(newBlog)
            .expect(401)
            .expect('Content-Type', /application\/json/)
    })

    test('DELETE: single blogs', async () => {
        const blogs = await helper.blogsInDb()
        const blogToDelete = blogs[0]

        await api.delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization',token)
            .expect(204)

        /**Retrieve again */
        const blogsUpdated = await helper.blogsInDb()
        expect(blogsUpdated).toHaveLength(helper.initialBlogs.length - 1)

        const contents = blogsUpdated.map(r => r.title)
        expect(contents).not.toContain(blogToDelete.title)

    })

    test('PUT: update blogs', async () => {
        const blogs = await helper.blogsInDb()
        const blogToUpdate = blogs[0]

        const updatedBlog = {...blogToUpdate, likes: 400}
        const res = await api.put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedBlog)
            .expect(200)

        const blogsUpdated = await helper.blogsInDb()
        expect(blogsUpdated).toContainEqual(updatedBlog)

    })
})

/**AFTER TESTS */
afterAll(() => {
    mongoose.connection.close()
})