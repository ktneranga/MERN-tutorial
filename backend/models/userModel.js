const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'Email name is required']
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);