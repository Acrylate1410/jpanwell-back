const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    sortFodder: {
        required: true,
        type: Number
    },
    date: {
        required: true,
        type: String
    },
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    thumbnail: {
        required: true,
        type: String
    },
    content: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Article', dataSchema)