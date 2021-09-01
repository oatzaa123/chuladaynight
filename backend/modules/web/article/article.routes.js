import express from 'express'
const router = express.Router()
import {
    getArticles,
    getArticle,
    addArticle,
    updateArticle,
    deleteArticle,
} from './article.controller'

router.route('/').get(getArticles).post(addArticle)

router.route('/:id').get(getArticle).put(updateArticle).delete(deleteArticle)

export default router
