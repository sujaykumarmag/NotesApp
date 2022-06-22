const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [ true ],
        ref: 'Users'
    },
    heading: {
        type: String,
        required:[true,'Heading is required'],
        min:[1,'Heading is required'],
        max:[30,'Not more than 30 chars ']
    },
    content: {
        type: String,
        required: [ true, 'Content is required' ],
        min:[1,'Some Content is required']
    },
    tags: {
        type: [ String ]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Notes', noteSchema)
