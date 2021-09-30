const express = require('express')
const router = express.Router()
const { addNetwork } = require('./network.controller')

router.route('/').post(addNetwork)

module.exports = router
