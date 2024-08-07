'use strict'
// 1 - importação
const express = require('express')
const router = express.Router()

// 2 - rota
router.get('/', (req, res, next)=>{
    res.status(200).send({
        title: "Node Store API",
        version: "0.0.1"
    })
})

// 3 - exportação
module.exports = router;