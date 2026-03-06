const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/db');
const User = require('../src/models/User');
const Vehicle = require('../src/models/Vehicle');
const { hashPassword } = require('../src/utils/auth');

describe('Vehicle Management API', () => {
    let adminToken;
    let customerToken;
    let vehicleId;

    beforeAll(async () => {
        // Sync database and seed initial test users
        await sequelize.sync({ force: true });

        const adminPassword = await hashPassword('admin123');
        const adminUser = await User.create({
            username: 'adminuser',
            email: 'admin@test.com',
            password: adminPassword,
            role: 'admin'
        });

        const customerPassword = await hashPassword('user123');
        const customerUser = await User.create({
            username: 'customeruser',
            email: 'customer@test.com',
            password: customerPassword,
            role: 'customer'
        });

        // Login to get tokens
        const adminRes = await request(app)
            .post('/api/users/login')
            .send({ email: 'admin@test.com', password: 'admin123' });
        adminToken = adminRes.body.data.token;

        const customerRes = await request(app)
            .post('/api/users/login')
            .send({ email: 'customer@test.com', password: 'user123' });
        customerToken = customerRes.body.data.token;
    });

    afterAll(async () => {
        await sequelize.close();
    });

    const testVehicle = {
        make: 'Ford',
        model: 'F-150',
        year: 2022,
        licensePlate: 'TRUCK-X1',
        pricePerDay: 85.00,
        status: 'available'
    };

    it('should list all vehicles', async () => {
        const res = await request(app).get('/api/vehicles');
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual('success');
        expect(Array.isArray(res.body.data)).toBeTruthy();
    });

    it('should create a vehicle if user is an admin', async () => {
        const res = await request(app)
            .post('/api/vehicles')
            .set('Authorization', `Bearer ${adminToken}`)
            .send(testVehicle);

        expect(res.statusCode).toEqual(201);
        expect(res.body.status).toEqual('success');
        expect(res.body.data).toHaveProperty('make', testVehicle.make);
        vehicleId = res.body.data.id;
    });

    it('should not create a vehicle with invalid data (DTO validation)', async () => {
        const invalidVehicle = { ...testVehicle, year: 1800 }; // invalid year below 1900
        const res = await request(app)
            .post('/api/vehicles')
            .set('Authorization', `Bearer ${adminToken}`)
            .send(invalidVehicle);

        expect(res.statusCode).toEqual(400);
        expect(res.body.status).toEqual('error');
    });

    it('should not create a vehicle if user is a customer', async () => {
        const res = await request(app)
            .post('/api/vehicles')
            .set('Authorization', `Bearer ${customerToken}`)
            .send(testVehicle);

        expect(res.statusCode).toEqual(403);
    });

    it('should get a specific vehicle by id', async () => {
        const res = await request(app).get(`/api/vehicles/${vehicleId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.id).toEqual(vehicleId);
    });

    it('should update a vehicle (admin only)', async () => {
        const updatedData = { pricePerDay: 95.50 };
        const res = await request(app)
            .put(`/api/vehicles/${vehicleId}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send(updatedData);

        expect(res.statusCode).toEqual(200);
        expect(parseFloat(res.body.data.pricePerDay)).toEqual(95.50);
    });

    it('should delete a vehicle (admin only)', async () => {
        const res = await request(app)
            .delete(`/api/vehicles/${vehicleId}`)
            .set('Authorization', `Bearer ${adminToken}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.data.message).toEqual('Vehicle deleted successfully');
    });

    it('should return 404 for non-existent vehicle', async () => {
        const res = await request(app).get('/api/vehicles/00000000-0000-0000-0000-000000000000');
        expect(res.statusCode).toEqual(404);
    });
});
