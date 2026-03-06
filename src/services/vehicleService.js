const Vehicle = require('../models/Vehicle');

class VehicleService {
    async getAllVehicles() {
        return await Vehicle.findAll();
    }

    async getVehicleById(id) {
        const vehicle = await Vehicle.findByPk(id);
        if (!vehicle) {
            throw new Error('Vehicle not found');
        }
        return vehicle;
    }

    async createVehicle(vehicleData) {
        return await Vehicle.create(vehicleData);
    }

    async updateVehicle(id, vehicleData) {
        const vehicle = await Vehicle.findByPk(id);
        if (!vehicle) {
            throw new Error('Vehicle not found');
        }
        return await vehicle.update(vehicleData);
    }

    async deleteVehicle(id) {
        const vehicle = await Vehicle.findByPk(id);
        if (!vehicle) {
            throw new Error('Vehicle not found');
        }
        await vehicle.destroy();
        return { message: 'Vehicle deleted successfully' };
    }
}

module.exports = new VehicleService();
