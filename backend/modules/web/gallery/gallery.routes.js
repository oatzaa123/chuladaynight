const express = require('express')
const router = express.Router()
const {
    getGalleries,
    getGallery,
    addGallery,
    nextGallery,
    perviousGallery,
    updateGallery,
    deleteGallery,
} = require('./gallery.controller')

router.route('/').get(getGalleries).post(addGallery)

router.route('/:id').get(getGallery).put(updateGallery).delete(deleteGallery)
router.route('/:id/nextGallery').get(nextGallery)
router.route('/:id/perviousGallery').get(perviousGallery)

module.exports = router
