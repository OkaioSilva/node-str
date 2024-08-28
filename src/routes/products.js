'use strict'
// 1 - importação
const express = require('express')
const router = express.Router()
//3 - referenciar o controller
const controller = require('../controllers/product-controller')

// 7 - puxar o auth-service
const authService = require("../services/auth-services")



// 2 - rotas
// create
// router.post('/', (req, res, next)=>{
//     res.status(201).send(req.body)
// }) 

//mudou para:
// router.post('/', controller.post);

// 8 utilizando o authService na rota post
router.post('/', authService.authorize ,controller.post);

// assim como put e delete
// put 
// router.put('/:id', controller.put)
router.put('/:id', authService.authorize, controller.put)

// delete
// router.delete('/', controller.delete)
router.delete('/', authService.authorize, controller.delete)

//3 - rota get
router.get('/', controller.get);

// 5 - :slug
router.get('/:slug', controller.getBySlug);
//6 - id
router.get('/admin/:id', controller.getById);
//6 - tags
router.get('/tags/:tag', controller.getByTag);

//4 - exportação
module.exports = router;