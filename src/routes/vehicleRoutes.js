const express = require('express');
const vehicleController = require('../controllers/vehicleController');
const validate = require('../middleware/validate');
const { createVehicleSchema, updateVehicleSchema } = require('../dtos/vehicleDTO');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', vehicleController.getAllVehicles);
router.get('/:id', vehicleController.getVehicleById);

// Protected routes (Admin only for write operations)
router.post('/', protect, authorize('admin'), validate(createVehicleSchema), vehicleController.createVehicle);
router.put('/:id', protect, authorize('admin'), validate(updateVehicleSchema), vehicleController.updateVehicle);
router.delete('/:id', protect, authorize('admin'), vehicleController.deleteVehicle);

module.exports = router;
