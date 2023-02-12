const mongoose = require('mongoose');

const { Schema } = mongoose;

const goalSchema = Schema({
    text: {
        type: String,
        required: [true, 'Please add a goal']
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Goal', goalSchema);