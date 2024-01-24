const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    sortFodder: {
        required: true,
        type: Number
    },
    name: {
        required: true,
        type: String
    },
    phone: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    message: {
        required: true,
        type: String
    },
    date: {
        required: true,
        type: String
    },
})

module.exports = mongoose.model('Message', dataSchema)