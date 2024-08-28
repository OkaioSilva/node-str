'use strict'
// 1 - importação
const express = require('express')
const router = express.Router()
//3 - referenciar o controller
const controller = require('../controllers/customer-controller')


router.post('/authenticate', controller.authenticate);
router.post('/', controller.post);

module.exports = router;