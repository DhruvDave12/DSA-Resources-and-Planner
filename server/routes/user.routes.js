const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middlewares/verifyToken.middleware');
const {handleGetUserDetails} = require('../controllers/user.controller');

// @route GET /user/details
// @desc Get user details
// @access Private
router.get('/details', verifyToken, handleGetUserDetails);

module.exports = router;