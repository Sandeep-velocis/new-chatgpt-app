const router = require('express').Router()
const chatGptRoutes = require('./chatGpt.routes')

router.use('/chatGpt', chatGptRoutes)

module.exports = router