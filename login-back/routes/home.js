const express = require('express');
const helper = require('../helper/helper');

const router = express.Router();

const homeController = require('../controllers/home');

router.get('/get-users', helper.checkAuthToken, homeController.getAllUsers);

module.exports = router;