const mongoose = require('mongoose');

const { Schema } = mongoose;

const goalSchema = Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: [true, 'Please add a goal']
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Goal', goalSchema);