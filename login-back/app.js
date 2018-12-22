const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/loginApp', { useNewUrlParser: true })
    .then(() => {
        app.listen(3000, () => {
            console.log('Server running on port 3000');
        });
        console.log('Mongodb connected');
    })
    .catch(err => console.log(err));