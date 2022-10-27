const express = require('express');
const router = express.Router();

const { handleRegister, handleLogin} = require('../controllers/auth.controller');

// @route POST /register
// @desc Register user
// @access Public
router.post('/register', handleRegister);

// @route POST /login
// @desc Login user
// @access Public
router.post('/login', handleLogin);


module.exports = router;