import express from 'express'
const router = express.Router()
import {
    getGalleries,
    getGallery,
    addGallery,
    nextGallery,
    perviousGallery,
    updateGallery,
    deleteGallery,
} from './gallery.controller'

router.route('/').get(getGalleries).post(addGallery)

router.route('/:id').get(getGallery).put(updateGallery).delete(deleteGallery)
router.route('/:id/nextGallery').get(nextGallery)
router.route('/:id/perviousGallery').get(perviousGallery)

export default router
