const express = require('express');
const router = express.Router();

const { handleRegister, handleLogin, handleLogout} = require('../controllers/auth.controller');

// @route POST /register
// @desc Register user
// @access Public
router.post('/register', handleRegister);

// @route POST /login
// @desc Login user
// @access Public
router.post('/login', handleLogin);

// @route GET /logout
// @desc Logout user
// @access Public
router.get('/logout', handleLogout);


module.exports = router;