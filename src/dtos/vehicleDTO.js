const Joi = require('joi');

const createVehicleSchema = Joi.object({
    make: Joi.string().required(),
    model: Joi.string().required(),
    year: Joi.number().integer().min(1900).max(new Date().getFullYear() + 1).required(),
    licensePlate: Joi.string().required(),
    pricePerDay: Joi.number().positive().required(),
    status: Joi.string().valid('available', 'rented', 'maintenance')
});

const updateVehicleSchema = Joi.object({
    make: Joi.string(),
    model: Joi.string(),
    year: Joi.number().integer().min(1900).max(new Date().getFullYear() + 1),
    licensePlate: Joi.string(),
    pricePerDay: Joi.number().positive(),
    status: Joi.string().valid('available', 'rented', 'maintenance')
}).min(1); // At least one field should be updated

module.exports = {
    createVehicleSchema,
    updateVehicleSchema
};
