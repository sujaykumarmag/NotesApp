
const express = require('express');
const { registerUser, login, getMe } = require('../controllers/users');
const { protect } = require('../middlewares/auth');


const router = express.Router();

router  
    .route('/register')
    .post(registerUser)

router
    .route('/login')
    .post(login)

router
    .route('/me')
    .get(protect, getMe)



module.exports = router;
