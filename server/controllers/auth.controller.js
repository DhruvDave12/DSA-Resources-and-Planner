const User = require('../models/user.model');
const {hashSync, compareSync} = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const {tokenOptions} = require('../constants/tokenOptions');

module.exports.handleRegister = async (req,res) => {
    const {username, email, password} = req.body;
    console.log(req.body);

    if(!username || !email || !password) {
        return res.status(400).json({message: 'Please enter all fields', success: false});
    }

    const user = await User.findOne({email});
    if(user) {
        return res.status(400).json({
            message: 'Email already exists',
            success: false
        });
    }
    const newUser = new User({
        username,
        email,
        password: hashSync(password, 10)
    });
    await newUser.save();
    res.status(200).json({
        message: 'User created successfully. Please log in to the system',
        success: true,
        user: newUser
    });
}

module.exports.handleLogin = async (req,res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return res.status(400).json({message: 'Please enter all fields', success: false});
    }
    const user = await User.findOne({email});
    if(!user) {
        return res.status(400).json({message: 'User does not exist', success: false});
    }
    const isMatch = compareSync(password, user.password);
    if(!isMatch) {
        return res.status(400).json({message: 'Invalid credentials', success: false});
    }

    const payload = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "2h"});
    
    res.cookie("token", token, tokenOptions);

    res.status(200).json({
        message: 'User logged in successfully',
        success: true,
        user,
        token
    });
}