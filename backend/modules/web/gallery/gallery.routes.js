const express = require('express')
const router = express.Router()
const {
    getGalleries,
    getGallery,
    addGallery,
    nextGallery,
    perviousGallery,
} = require('./gallery.controller')

router.route('/').get(getGalleries).post(addGallery)

router.route('/:id').get(getGallery)
router.route('/:id/nextGallery').get(nextGallery)
router.route('/:id/perviousGallery').get(perviousGallery)

module.exports = router
