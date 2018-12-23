const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.loginUser = (req, res) => {
    const Schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    const { error, value } = Joi.validate(req.body, Schema);
    if (error && error.details) return res.status(400).json({ message: error.details });

    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) return res.status(404).json({ message: 'Email does not exist.' });
            return bcrypt.compare(value.password, user.password)
                .then(result => {
                    if (!result) return res.status(500).json({ message: 'Password incorrect.' });
                    const token = jwt.sign({ data: user }, 'mysecret', {
                        expiresIn: '1h'
                    });
                    res.status(200).json({ message: 'Login successful.', user, token });
                });
        })
        .catch(err => res.status(500).json({ message: err }));
}