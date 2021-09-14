const mongoose = require('mongoose')

const workshopSchema = mongoose.Schema({
    coverImage: { path: String, name: String },
    image: { path: String, name: String },
    title_th: { type: String },
    title_en: { type: String },
    description_th: { type: String },
    description_en: { type: String },
    locationName_th: { type: String },
    locationName_en: { type: String },
    period: { type: String },
    path: { type: String },
    staff: { type: String },
    contact: {
        telephone: { type: String },
        location: {
            latitude: String,
            longitude: String,
        },
        facebook: String,
        instagram: String,
        mailto: String,
    },
    createdAt: {
        type: String,
        default: Date.now(),
    },
    updatedAt: {
        type: String,
        default: Date.now(),
    },
})

const WorkShop = mongoose.model('WorkShop', workshopSchema)

module.exports = WorkShop
