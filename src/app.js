'use strict'
//1 - importar o express
const express = require('express')
//10 - mongoose
const mongoose = require("mongoose")

//2 - crie a aplicação:
        //13- config
        const config = require('./config')
const app = express()
const router = express.Router()

//11 - conectando ao banco
// mongoose.connect('mongodb+srv://<user>:<password>@node-store.cga1z.mongodb.net/')
// 14 vamos chamar nossa config no mongoose.connect
mongoose.connect(config.connectionString)

//12 - carregar os models
const Product = require('./models/product')
const Customer = require('./models/customer')
const Order = require('./models/order')


// 7 - carregar as Rotas
    //1
    const indexRoutes = require('./routes/index')
    //2
    const productsRoutes = require('./routes/products')
    //13
    const customerRoutes = require('./routes/customer-route')
    //14
    const orderRoutes = require('./routes/order-route')

    
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
    app.use('/customers', customerRoutes);
    app.use('/orders', orderRoutes);


    //- Boyd parser express
    app.use(express.urlencoded({extended:false}))
    app.use(express.json({
        limit: '5mb'
    }))

    // habilita o CORS
    app.use(function(req, res, next){
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    })



//4 - exportando app
module.exports = app