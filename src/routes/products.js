'use strict'
// 1 - importação
const express = require('express')
const router = express.Router()
 
// create
router.post('/', (req, res, next)=>{
    res.status(201).send(req.body)
})

// put 
router.put('/:id', (req, res, next)=>{
    const id = req.params.id;
    res.status(201).send({
        id: id, 
        item: req.body
    })
})

// delete
router.delete('/', (req, res, next)=>{
    res.status(200).send(req.body)
})

// exportação
module.exports = router;