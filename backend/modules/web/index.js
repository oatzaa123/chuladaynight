import express from 'express'
import { galleryRoutes } from './gallery/index'
import { workshopRoutes } from './workshop/index'
import { articleRoutes } from './article/index'
import { newsRoutes } from './news/index'

const router = express.Router()

router.use('/gallery', galleryRoutes)
router.use('/workshop', workshopRoutes)
router.use('/article', articleRoutes)
router.use('/news', newsRoutes)

export default router
