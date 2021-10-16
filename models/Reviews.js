const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true,
        unique: false
    },
    description: {
        type: String,
        required: true,
        unique: false
    },
    photo: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('reviews', reviewsSchema);
