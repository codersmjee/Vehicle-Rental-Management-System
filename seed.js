const { connectDB } = require('./src/db');
const User = require('./src/models/User');
const Vehicle = require('./src/models/Vehicle');
const { hashPassword } = require('./src/utils/auth');

const seedData = async () => {
    try {
        await connectDB();

        // Clear existing data
        await User.destroy({ where: {} });
        await Vehicle.destroy({ where: {} });

        // Create Admin User
        const adminPassword = await hashPassword('admin123');
        await User.create({
            username: 'admin',
            email: 'admin@example.com',
            password: adminPassword,
            role: 'admin'
        });

        // Create Customer User
        const customerPassword = await hashPassword('user123');
        await User.create({
            username: 'johndoe',
            email: 'john@example.com',
            password: customerPassword,
            role: 'customer'
        });

        // Create initial Vehicles
        await Vehicle.bulkCreate([
            {
                make: 'Tesla',
                model: 'Model 3',
                year: 2023,
                licensePlate: 'ABC-123',
                pricePerDay: 150.00,
                status: 'available'
            },
            {
                make: 'Toyota',
                model: 'Camry',
                year: 2022,
                licensePlate: 'XYZ-789',
                pricePerDay: 60.00,
                status: 'available'
            },
            {
                make: 'Ford',
                model: 'Mustang',
                year: 2021,
                licensePlate: 'FAST-01',
                pricePerDay: 120.00,
                status: 'rented'
            }
        ]);

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedData();
