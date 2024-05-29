const User = require('../models/User');

exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

exports.getUserByUsername = async (req, res, next) => {
    const username = req.params.username;

    try {
        const user = await User.findByUsername(username);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};
