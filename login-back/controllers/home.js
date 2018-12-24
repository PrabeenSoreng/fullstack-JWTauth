const User = require('../models/user');

exports.getAllUsers = async(req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({ message: 'All users', users });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}