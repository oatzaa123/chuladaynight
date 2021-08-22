const mongoose = require('mongoose')

const gallerySchema = mongoose.Schema({
    title: { type: String, required: [true, 'title is not be empty'] },
    author: {
        name: { type: String, required: [true, 'author name is not be empty'] },
        image: { path: String, name: String },
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
        path: String,
        name: String,
    },
    location: {
        latitude: String,
        longitude: String,
    },
    content: [
        {
            _id: false,
            path: String,
            contentType: String,
            contentValue: String,
        },
    ],
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
