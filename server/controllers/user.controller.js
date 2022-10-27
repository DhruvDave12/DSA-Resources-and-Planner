const User = require('../models/user.model');

module.exports.handleGetUserDetails = async (req,res) => {
    if(!req.user){
        return res.status(400).json({success: false, message: 'Token is required'});
    }

    const user = await User.findById(req.user.id);
    if(!user) {
        return res.status(400).json({success: false,message: 'User does not exist'});
    }
    res.status(200).json({
        success: true,
        message: "User fetched successfully",
        user
    });
}