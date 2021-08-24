const mongoose = require('mongoose')

const gallerySchema = mongoose.Schema({
    title_th: { type: String, required: [true, 'title is not be empty'] },
    title_en: { type: String, required: [true, 'title is not be empty'] },
    author: {
        name_th: {
            type: String,
            required: [true, 'author name is not be empty'],
        },
        name_en: { type: String },
        image: { path: String, name: String },
        group_th: { type: String },
        group_en: { type: String },
        contact: {
            facebook: { type: String },
            line: { type: String },
            email: { type: String },
            phone: { type: String },
        },
    },
    shortDescription_th: { type: String },
    shortDescription_en: { type: String },
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
            contentValue_th: String,
            contentValue_en: String,
        },
    ],
    createdAt: {
        type: Number,
        default: Date.now(),
    },
    updatedAt: {
        type: Number,
        default: Date.now(),
    },
})

const Gallery = mongoose.model('Gallery', gallerySchema)

module.exports = Gallery
