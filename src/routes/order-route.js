'use strict'
// 1 - importação
const express = require('express')
const router = express.Router()
//3 - referenciar o controller
const controller = require('../controllers/order-controller')

const authService = require("../services/auth-services")


// router.get('/', controller.get);
// router.post('/', controller.post);
router.get('/', authService.authorize, controller.get);
router.post('/', authService.authorize, controller.post);

module.exports = router;