'use strict'
//1 - importar o http, o debug, e o express
const http = require("http")
const debug = require("debug")("nodestr:server")
const express = require('express')


//2 - crie a aplicação:
    const app = express()
    const port = normalizePort(process.env.PORT || "3000");
    app.set('port', port)

//3 - criando o servidor
    const server = http.createServer(app)
    const router = express.Router()

//4 - criando a primeira rota
    const route = router.get('/', (req, res, next)=>{
        res.status(200).send({
            title: "Node Store API",
            version: "0.0.1"
        })
    })
    app.use('/', route)
//5 - pedir para o servirdor ficar ouvindo:
    server.listen(port)
    console.log("API rodando na porta: " + port)



// função retirada do gerador de código do Express
    function normalizePort(val){
        const port = parseInt(val, 10)

        if(isNaN(port)){
            return val;
        }

        if(port >= 0){
            return port
        }

        return false;
    }