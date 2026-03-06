const User = require('../models/User');
const { hashPassword, comparePassword, generateToken } = require('../utils/auth');

class UserService {
    async register(userData) {
        const { username, email, password, role } = userData;
        
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            throw new Error('User already exists');
        }
        
        const hashedPassword = await hashPassword(password);
        
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role: role || 'customer'
        });
        
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        };
    }

    async login(email, password) {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('Invalid credentials');
        }
        
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }
        
        const token = generateToken({ id: user.id, role: user.role });
        
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            token
        };
    }
}

module.exports = new UserService();
