import express from 'express'
const router = express.Router()
import {
    getNews,
    getOneNews,
    addNews,
    nextNews,
    perviousNews,
    updateNews,
    deleteNews,
} from './news.controller'

router.route('/').get(getNews).post(addNews)

router.route('/:id').get(getOneNews).put(updateNews).delete(deleteNews)
router.route('/:id/nextNews').get(nextNews)
router.route('/:id/perviousNews').get(perviousNews)

export default router
