const mongoose = require('mongoose');

const servicesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    price: {
        type: Number,
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

module.exports = mongoose.model('services', servicesSchema);