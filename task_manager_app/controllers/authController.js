const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { secret } = require('../config/config');

exports.register = async (req, res, next) => {
    const { username, email, password} = req.body;

    try {
        // Check if username or email already exists
        const existingUser = await User.findByUsername(username);
        if (existingUser) {
            return res.status(409).json({ message: 'Username already exists' });
        }

        const existingEmail = await User.findByEmail(email);
        if (existingEmail) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUsername = await User.createUser(username, email, hashedPassword, 'user');

        res.status(201).json({ message: 'User registered successfully', username: newUsername });

    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const user = await User.findByUsername(username);

        if (!user) {
            return res.status(401).json({ message: 'Auth failed' });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Auth failed' });
        }

        const token = jwt.sign(
            { username: user.username, role: user.role },
            secret,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            token: token,
            expiresIn: 3600,
            username: user.username,
            role: user.role
        });
    } catch (error) {
        next(error);
    }
};
