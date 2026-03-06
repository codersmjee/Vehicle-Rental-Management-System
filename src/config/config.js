require('dotenv').config();

module.exports = {
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || 'development',
    db: {
        type: process.env.DB_TYPE || 'sqlite',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || (process.env.DB_TYPE === 'postgres' ? 5432 : 3306),
        user: process.env.DB_USER || 'root',
        pass: process.env.DB_PASS || 'password',
        name: process.env.DB_NAME || 'vehicle_rental_db',
        storage: process.env.DB_STORAGE || './database.sqlite'
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'fallback_secret',
        expiresIn: process.env.JWT_EXPIRES_IN || '24h'
    }
};
