const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    link: {
        required: true,
        type: String
    },
    width: {
        required: true,
        type: String
    },
    thumbnail: {
        required: true,
        type: String
    },
    category: {
        required: true,
        type: String
    },
    function: {
        required: true,
        type: Array
    },
    ingredients: {
        required: true,
        type: String
    },
    instruction: {
        required: true,
        type: String
    },
    subject: {
        required: true,
        type: String
    },
    preserve: {
        required: true,
        type: String
    },
    warnings: {
        required: true,
        type: Array
    },
    mass: {
        required: true,
        type: String
    },
    productionDate: {
        required: true,
        type: String
    },
    expirationDate: {
        required: true,
        type: String
    },
    factory: {
        required: true,
        type: String
    },
    address: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Product', dataSchema)