const express = require('express')
const { galleryRoutes } = require('./gallery/index')
const { workshopRoutes } = require('./workshop/index')
const { articleRoutes } = require('./article/index')
const { newsRoutes } = require('./news/index')
const { networkRoutes } = require('./network/index')

const router = express.Router()

router.use('/gallery', galleryRoutes)
router.use('/workshop', workshopRoutes)
router.use('/article', articleRoutes)
router.use('/news', newsRoutes)
router.use('/network', networkRoutes)

module.exports = router
