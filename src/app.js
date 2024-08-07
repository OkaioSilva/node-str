'use strict'
//1 - importar o express
const express = require('express')

//2 - crie a aplicação:
const app = express()
const router = express.Router()

// 6 - body parser express
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//3 - criando a primeira rota
const route = router.get('/', (req, res, next)=>{
        res.status(200).send({
            title: "Node Store API",
            version: "0.0.1"
        })
    })
    
//5 - novas rotas
    // create
    const create = router.post('/', (req, res, next)=>{
        res.status(201).send(req.body)
    })
    // put 
    const put = router.put('/:id', (req, res, next)=>{
        const id = req.params.id;
        res.status(201).send({
            id: id, 
            item: req.body
        })
    })

    // delete
    const del = router.delete('/', (req, res, next)=>{
        res.status(200).send(req.body)
    })
    
    app.use('/', route)
    app.use('/products', create);
    app.use('/products', put);
    app.use('/products', del);
//4 - exportando app
module.exports = app