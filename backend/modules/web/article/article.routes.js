const express = require('express')
const router = express.Router()
const {
    getArticles,
    getArticle,
    addArticle,
    updateArticle,
    deleteArticle,
} = require('./article.controller')

router.route('/').get(getArticles).post(addArticle)

router.route('/:id').get(getArticle).put(updateArticle).delete(deleteArticle)

module.exports = router
