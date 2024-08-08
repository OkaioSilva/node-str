'use strict'
//1 - importar o express
const express = require('express')
//10 - mongoose
const mongoose = require("mongoose")

//2 - crie a aplicação:
const app = express()
const router = express.Router()

//11 - conectando ao banco
mongoose.connect('mongodb+srv://silv4kaio:Ks979690288k@node-store.cga1z.mongodb.net/')


// 7 - carregar as Rotas
    //1
    const indexRoutes = require('./routes/index')
    //2
    const productsRoutes = require('./routes/products')

    
// 6 - body parser express
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//3 - criando a primeira rota
// 8- copiar e colar no index.js em routes.
// const route = router.get('/', (req, res, next)=>{
//         res.status(200).send({
//             title: "Node Store API",
//             version: "0.0.1"
//         })
//     }) 
    
//5 - novas rotas
    // // create
    // 9 - copiar e colar todas em products.js
    // const create = router.post('/', (req, res, next)=>{
    //     res.status(201).send(req.body)
    // })
    // // put 
    // const put = router.put('/:id', (req, res, next)=>{
    //     const id = req.params.id;
    //     res.status(201).send({
    //         id: id, 
    //         item: req.body
    //     })
    // })

    // // delete
    // const del = router.delete('/', (req, res, next)=>{
    //     res.status(200).send(req.body)
    // }) todas foram para products.js
    
    // app.use
    app.use('/', indexRoutes);
    app.use('/products', productsRoutes);



//4 - exportando app
module.exports = app