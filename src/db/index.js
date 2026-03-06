const { Sequelize } = require('sequelize');
const config = require('../config/config');

const dbConfig = config.db;

let sequelize;

if (dbConfig.type === 'sqlite') {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: dbConfig.storage,
        logging: false
    });
} else {
    sequelize = new Sequelize(dbConfig.name, dbConfig.user, dbConfig.pass, {
        host: dbConfig.host,
        port: dbConfig.port,
        dialect: dbConfig.type, // 'mysql' | 'postgres' | 'mssql' | 'mariadb'
        logging: false
    });
}

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log(`Connected to ${dbConfig.type} database successfully.`);
        
        // Sync models
        await sequelize.sync({ alter: true });
        console.log('Database synced.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };
