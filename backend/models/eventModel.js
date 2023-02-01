const mongoose = require('mongoose')

const Schema = mongoose.Schema

const eventSchema = Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    timing: {
        type: Date,
        min: '2023-02-23T10:00:00Z',
        max: '2023-02-26T22:00:00Z',
    },
    participants: {
        type: Number,
        min: 0,
        max: 60,
    }
}, { timestamps : true })

module.exports = mongoose.model('Event',eventSchema)