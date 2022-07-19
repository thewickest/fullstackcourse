const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const firstUser = require('../utils/list_helper').firstUser
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const { after } = require('lodash')

/**BEFORE TESTS */
beforeEach(async () => {
    await User.deleteMany({})

    const users = helper.initialUsers
        .map(user => new User(user))
    const promiseUsers = users.map(user => user.save())
    await Promise.all(promiseUsers)
})

/** TESTS */
describe('api tests', () => {
    /**Add User */
    describe('POST: Test adding incorrect user-',() => {
        test('Username too short', async() => {
            const newUser = {
                username: 'ts',
                name: 'Incorrect name',
                password: 'Pass'
            }
    
            await api.post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)
    
            const totalUsers = await helper.usersInDb()
            expect(totalUsers).toHaveLength(helper.initialUsers.length)
        })
    
        test('Password too short', async () => {
            const newUser = {
                username: 'Incorrect username',
                name: 'Incorrect name',
                password: 'ps'
            }
    
            await api.post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)
    
            const totalUsers = await helper.usersInDb()
            expect(totalUsers).toHaveLength(helper.initialUsers.length)
        })
        test('Need username', async () => {
            const newUser = {
                name: 'Incorrect name',
                password: 'Pass'
            }
    
            await api.post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)
    
            const totalUsers = await helper.usersInDb()
            expect(totalUsers).toHaveLength(helper.initialUsers.length)
        })
        test('Need password', async () => {
            const newUser = {
                username: 'This is a name',
                name: 'Incorrect name'
            }
    
            await api.post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)
    
            const totalUsers = await helper.usersInDb()
            expect(totalUsers).toHaveLength(helper.initialUsers.length)
        })

    })
    
})

/**AFTER TESTS */
afterAll(() => {
    mongoose.connection.close()
})
