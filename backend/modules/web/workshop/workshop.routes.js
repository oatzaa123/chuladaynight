import express from 'express'
const router = express.Router()
import {
    getWorkshops,
    getWorkshop,
    addWorkshop,
    updateWorkshop,
    deleteWorkshop,
} from './workshop.controller'

router.route('/').get(getWorkshops).post(addWorkshop)

router.route('/:id').get(getWorkshop).put(updateWorkshop).delete(deleteWorkshop)

export default router
