"use strict";

const ValidationContract = require("../validators/fluent-validator");
const repository = require("../repositories/customer-repository");


//post
exports.post = async (req, res, next) => {
    // 10 - inicializando as validações do fluent-validator
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 4, "O nome deve conter pelo menos 4 caracteres");
    contract.isEmail(req.body.email, "E-mail inválido");
    contract.hasMinLen(req.body.password, 6, "A senha deve conter pelo menos 6 caracteres");

    //11 - Se os dados forem inválidos:
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    
    try {
        await repository.create(req.body);
        res.status(201).send({message: "Cliente cadastrado com sucesso",
    });
    } catch (e) {
        res.status(500).send({message: "Falha ao cadastrar cliente" + e,});
    }
};

