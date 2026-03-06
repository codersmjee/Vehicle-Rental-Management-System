const userService = require('../services/userService');

const register = async (req, res) => {
    try {
        const result = await userService.register(req.body);
        res.status(201).json({ status: 'success', data: result });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await userService.login(email, password);
        res.status(200).json({ status: 'success', data: result });
    } catch (error) {
        res.status(401).json({ status: 'error', message: error.message });
    }
};

module.exports = {
    register,
    login
};
