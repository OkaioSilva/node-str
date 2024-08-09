'use strict'
// 1 - importação
const express = require('express')
const router = express.Router()
//3 - referenciar o controller
const controller = require('../controllers/product-controller')



// 2 - rotas
// create
// router.post('/', (req, res, next)=>{
//     res.status(201).send(req.body)
// }) 

//mudou para:
router.post('/', controller.post);

// assim como put e delete
// put 
router.put('/:id', controller.put)

// delete
router.delete('/', controller.delete)

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