const vehicleService = require('../services/vehicleService');

const getAllVehicles = async (req, res) => {
    try {
        const vehicles = await vehicleService.getAllVehicles();
        res.status(200).json({ status: 'success', data: vehicles });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const getVehicleById = async (req, res) => {
    try {
        const vehicle = await vehicleService.getVehicleById(req.params.id);
        res.status(200).json({ status: 'success', data: vehicle });
    } catch (error) {
        res.status(404).json({ status: 'error', message: error.message });
    }
};

const createVehicle = async (req, res) => {
    try {
        const vehicle = await vehicleService.createVehicle(req.body);
        res.status(201).json({ status: 'success', data: vehicle });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

const updateVehicle = async (req, res) => {
    try {
        const vehicle = await vehicleService.updateVehicle(req.params.id, req.body);
        res.status(200).json({ status: 'success', data: vehicle });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

const deleteVehicle = async (req, res) => {
    try {
        const result = await vehicleService.deleteVehicle(req.params.id);
        res.status(200).json({ status: 'success', data: result });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

module.exports = {
    getAllVehicles,
    getVehicleById,
    createVehicle,
    updateVehicle,
    deleteVehicle
};
