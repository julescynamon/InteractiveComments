const UserModel = require('../models/user.models');

module.exports.signUp = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await UserModel.create({ username, email, password });
        res.status(201).json({
            message: 'User created',
            user: user._id,
        });
    } catch {
        res.status(500).json({
            message: 'Internal server error',
        });
    }
};
