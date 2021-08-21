const mongoose = require('mongoose')
const moment = require('moment')

const gallerySchema = mongoose.Schema({
    title: { type: String, required: [true, 'title is not be empty'] },
    author: {
        name: { type: String, required: [true, 'author name is not be empty'] },
        image: { type: String },
        group: { type: String },
        contact: {
            facebook: { type: String },
            line: { type: String },
            email: { type: String },
            phone: { type: String },
        },
    },
    shortDescription: { type: String },
    coverImage: {
        type: String,
        required: [true, 'coverImage is not be empty'],
    },
    location: {
        latitude: String,
        longitude: String,
    },
    content: {
        _id: false,
        image: [{ name: String }],
        description: {
            type: String,
            required: [true, 'description is not be empty'],
        },
        modelImage: [{ name: String }],
        video: [{ name: String }],
    },
    createdAt: {
        type: String,
        default: new Date(Date.now()),
    },
    updatedAt: {
        type: String,
        default: new Date(Date.now()),
    },
})

const Gallery = mongoose.model('Gallery', gallerySchema)

module.exports = Gallery
