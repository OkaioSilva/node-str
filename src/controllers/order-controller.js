"use strict";

const ValidationContract = require("../validators/fluent-validator");
const repository = require("../repositories/order-repository");
// 9 authService
const authService = require('../services/auth-services')

// 8 - guid
const guid = require('guid')
//2 - exportando o post

// 6 - get

exports.get = async (req, res, next) => {
    try {
        let data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({message: "Falha ao processar sua requisição",});
    }
    };

//post
exports.post = async (req, res, next) => {
    // 3 - inicializando as validações do fluent-validator
    
    // depois fazer as validações de acordo com o model order!!!

    // let contract = new ValidationContract();
    // contract.hasMinLen(req.body.name, 4, "O nome deve conter pelo menos 4 caracteres");
    // contract.isEmail(req.body.email, "E-mail inválido");
    // contract.hasMinLen(req.body.password, 6, "A senha deve conter pelo menos 6 caracteres");

    //4 - Se os dados forem inválidos:
    // if (!contract.isValid()) {
    //     res.status(400).send(contract.errors()).end();
    //     return;
    // }
    // 5 - try/catch 
    try {
        // 7-  token
         // recupera token   
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        // decodifica token
        const data = await authService.decodeToken(token)
        
        
        //6 - mudar o req.body por um obj do model order e usando o guid para receber o nª do pedido
        await repository.create({
            // customer: req.body.customer, <= mudou =>
            customer: data.id,
            number: guid.raw().substring(0,6),
            items: req.body.items
        });
        res.status(201).send({message: "Pedido cadastrado com sucesso",
    });
    } catch (e) {
        res.status(500).send({message: "Falha ao cadastrar pedido" + e,});
    }
};

