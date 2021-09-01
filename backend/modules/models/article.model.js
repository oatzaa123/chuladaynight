import mongoose from 'mongoose'

const articleSchema = mongoose.Schema({
    coverImage: { path: String, name: String },
    title_th: String,
    title_en: String,
    description_th: String,
    description_en: String,
    year: String,
    createdAt: {
        type: String,
        default: Date.now(),
    },
    updatedAt: {
        type: String,
        default: Date.now(),
    },
})

const Article = mongoose.model('Article', articleSchema)

export default Article
