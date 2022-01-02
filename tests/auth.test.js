const {api, closeConnection} = require('./helpers')
const {testUser} = require('./fixtures/index')
const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})
    await api.post('/auth/register').send(testUser)
})

afterAll(closeConnection)

describe('Login request should', () => {
    test('response with status 200', async () => {
        await api.post('/auth/login')
            .send({email: testUser.email, password: testUser.password})
            .expect("Content-Type", /json/)
            .expect(200)
    })

    test('response 400 if no data inputs', async () => {
        await api.post('/auth/login')
            .send({})
            .expect(400)
    })

    test('response 400 if user does not exist', async () => {
        await api.post('/auth/login')
            .send({email: 'novalid@gmail.com', password: testUser.password})
            .expect(400)
    })

    test('response 400 if password is invalid', async () => {
        await api.post('/auth/login')
            .send({email: testUser.email, password: 'invalid_password'})
            .expect(400)
    })

    test('send user json', async () => {
        const response = await api.post('/auth/login').send({
            email: testUser.email,
            password: testUser.password
        })
        expect(response.body.email).toBe(testUser.email)
    })

})
