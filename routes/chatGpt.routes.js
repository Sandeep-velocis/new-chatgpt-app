const router = require('express').Router()
const controller = require('../controller/chatGpt.controller')

router.all('/messages', controller.message)
// router.get('/indexPage', controller.indexPage)
module.exports = router