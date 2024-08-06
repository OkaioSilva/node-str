//1 - importar o express
const express = require('express')

//2 - crie a aplicação:
const app = express()
const router = express.Router()

//3 - criando a primeira rota
const route = router.get('/', (req, res, next)=>{
        res.status(200).send({
            title: "Node Store API",
            version: "0.0.1"
        })
    })
    app.use('/', route)

// exportando app
module.exports = app