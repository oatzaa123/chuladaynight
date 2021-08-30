const express = require('express')
const router = express.Router()
const {
    getWorkshops,
    getWorkshop,
    addWorkshop,
    updateWorkshop,
    deleteWorkshop,
} = require('./workshop.controller')

router.route('/').get(getWorkshops).post(addWorkshop)

router.route('/:id').get(getWorkshop).put(updateWorkshop).delete(deleteWorkshop)

module.exports = router
