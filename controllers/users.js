const asyncHandler = require('express-async-handler');
const Users = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// @desc    : Register a new user
// @route   : POST /api/v1/users/register
// @access  : Public
exports.registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash(password, salt);
    if (!req.body) {
        throw new Error('Please Enter the details in the body');
    }
    const userExists = await Users.findOne({ email });
    if (userExists) {
        throw new Error('User Already Exists ');
    }
    console.log(req.body)
    const user = await Users.create({
        username: username,
        email: email,
        password: pass

    })
    if (!user) {
        throw new Error('Please Enter All the details in the body');
    }
    res.status(201).json({ success: true, data: user,token:generateToken(user._id) });
})


// @desc    : Authenticate a new user
// @route   : POST /api/v1/users/login
// @access  : Public
exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!req.body) {
        throw new Error('Please Enter the details, in the body');
    }
    const user = await Users.findOne({ email }).select('+password');
    if (!user) {
        throw new Error('No User registered Please Register ')
    }
    const decode = await bcrypt.compare(password, user.password);
    if (user && decode) {
        res.json({ success: true, token: generateToken(user._id) });
    } else {
        throw new Error('Invalid Credentials');
    }
    
})

// @desc    : Get all the notes based on loggedIn user
// @route   : GET /api/v1/users/me
// @access  : Private
exports.getMe = asyncHandler(async (req, res) => {
    const { _id, name, email } = await Users.findById(req.user.id);
    res.status(200).json({ success: true, id: _id, name: name, email: email });
})


// Generation of JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}