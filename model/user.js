const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String
    },
    encryptedPassword:{
        required: true,
        type: String
    },
    userType: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('users', userSchema);