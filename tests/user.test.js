const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/db');
const User = require('../src/models/User');

describe('User Authentication API', () => {
    beforeAll(async () => {
        // Use a test DB in memory or separate file
        // For simplicity we just use the current one and cleanup
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    const testUser = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'Password123',
        role: 'customer'
    };

    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/users/register')
            .send(testUser);

        expect(res.statusCode).toEqual(201);
        expect(res.body.status).toEqual('success');
        expect(res.body.data).toHaveProperty('username', testUser.username);
    });

    it('should not register user with duplicate email', async () => {
        const res = await request(app)
            .post('/api/users/register')
            .send(testUser);

        expect(res.statusCode).toEqual(400);
        expect(res.body.status).toEqual('error');
    });

    it('should login the user and return a token', async () => {
        const res = await request(app)
            .post('/api/users/login')
            .send({
                email: testUser.email,
                password: testUser.password
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual('success');
        expect(res.body.data).toHaveProperty('token');
    });

    it('should fail login with wrong password', async () => {
        const res = await request(app)
            .post('/api/users/login')
            .send({
                email: testUser.email,
                password: 'WrongPassword'
            });

        expect(res.statusCode).toEqual(401);
        expect(res.body.status).toEqual('error');
    });
});
