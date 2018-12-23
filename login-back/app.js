const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const signup = require('./routes/signup');
const login = require('./routes/login');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', signup);
app.use('/api/auth', login);

mongoose.connect('mongodb://localhost/loginApp', { useNewUrlParser: true })
    .then(() => {
        app.listen(3000, () => {
            console.log('Server running on port 3000');
        });
        console.log('Mongodb connected');
    })
    .catch(err => console.log(err));