const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:[true,'Please give a Username']
    },
    email: {
        type: String,
        required: [ true, 'Please add an email' ],
        unique: true,
        match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email' ]
    },
    password: {
        type: String,
        required: [ true, 'Please add a Password' ],
        minlength: 6,
        select: false
    },
    createdAt: {
        type: String,
        default: Date.now
    }
})


module.exports = mongoose.model('Users', userSchema);
