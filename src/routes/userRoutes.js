const express = require('express');
const userController = require('../controllers/userController');
const validate = require('../middleware/validate');
const { registerSchema, loginSchema } = require('../dtos/userDTO');

const router = express.Router();

router.post('/register', validate(registerSchema), userController.register);
router.post('/login', validate(loginSchema), userController.login);

module.exports = router;
