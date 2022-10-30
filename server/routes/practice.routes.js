const express = require('express');
const router = express.Router();
const {getDataFromYOUTUBE} = require('../controllers/practice.controller');
const {verifyToken} = require('../middlewares/verifyToken.middleware');

// @route   GET practice/get-data/q=foo
// @desc    Get videos on query
// @access  Private
// create a route that has q=query
router.get('/get-data', verifyToken, getDataFromYOUTUBE);

module.exports = router;