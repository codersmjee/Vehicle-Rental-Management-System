const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Vehicle = sequelize.define('Vehicle', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    make: {
        type: DataTypes.STRING,
        allowNull: false
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    licensePlate: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    pricePerDay: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('available', 'rented', 'maintenance'),
        defaultValue: 'available'
    }
}, {
    timestamps: true
});

module.exports = Vehicle;
