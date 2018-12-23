const Joi = require('joi');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.createUser = async(req, res) => {
    const Schema = Joi.object().keys({
        username: Joi.string().min(3).max(20).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required()
    });

    const { error, value } = Joi.validate(req.body, Schema);
    if (error && error.details) return res.status(400).json({ message: error.details });

    const username = await User.findOne({ username: req.body.username });
    if (username) return res.status(409).json({ message: 'Username already exists' });

    const email = await User.findOne({ email: req.body.email });
    if (email) return res.status(409).json({ message: 'Email already exists' });


    User.create({
            username: value.username,
            email: value.email,
            password: value.password
        })
        .then(user => {
            const token = jwt.sign({ data: user }, 'mysecret', {
                expiresIn: '1h'
            });
            res.status(201).json({ message: 'User created successfully', user, token });
        })
        .catch(err => {
            res.status(500).json({ message: err });
        });
};