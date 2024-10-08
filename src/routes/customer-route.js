'use strict'
// 1 - importação
const express = require('express')
const router = express.Router()
//3 - referenciar o controller
const controller = require('../controllers/customer-controller')
const authService = require("../services/auth-services")

router.post('/', controller.post);
router.post('/authenticate', controller.authenticate);
router.post('/refresh-token', authService.authorize, controller.refreshToken);

module.exports = router;