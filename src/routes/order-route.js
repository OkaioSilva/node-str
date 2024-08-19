'use strict'
// 1 - importação
const express = require('express')
const router = express.Router()
//3 - referenciar o controller
const controller = require('../controllers/order-controller')


router.get('/', controller.get);
router.post('/', controller.post);

module.exports = router;