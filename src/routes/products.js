'use strict'
// 1 - importação
const express = require('express')
const router = express.Router()
//3 - referenciar o controller
const controller = require('../controllers/profuct-controller')



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

// exportação
module.exports = router;