"use strict";

const ValidationContract = require("../validators/fluent-validator");
const repository = require("../repositories/customer-repository");
// 12 modulo de md5 e bcrypt para encriptar senhas dos usuários 
const bcrypt = require('bcrypt')
const md5 = require('md5')
const config = require("../config")
//sendEmail
const sendEmail = require('../services/email-services')
//authService
const authService = require('../services/auth-services')


async(password)=>{
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword
}


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
    
    // bcrypt e salt de senha
    // const salt = await bcrypt.genSalt(10);
    // const hashPassword = await bcrypt.hash(req.body.password, salt);


    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
            //roles
            roles: ["user"]
        });

        //send email
        sendEmail(
            req.body.email,
            "Bem vindo ao Node Store",
            global.EMAIL_TMPL.replace('{0}', req.body.name)
        )

        res.status(201).send({message: "Cliente cadastrado com sucesso",
    });
    } catch (e) {
        res.status(500).send({message: "Falha ao cadastrar cliente" + e});
    }
};

//  authenticate
exports.authenticate = async (req, res, next) => {
    // 10 - inicializando as validações do fluent-validator
    let contract = new ValidationContract();
    contract.isEmail(req.body.email, "E-mail inválido");
    contract.hasMinLen(req.body.password, 6, "A senha deve conter pelo menos 6 caracteres");

    //11 - Se os dados forem inválidos:
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if(!customer){
            res.status(404).send({
                message: "Usuário ou senha inválidos"
            })
            return;
        }

        // pegar as informações do customer e gerar um token
        const token = await authService.generateToken({
        id: customer._id,
        email: customer.email,
        name: customer.name,
        roles: customer.roles
        })

        res.status(201).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name
            }
    });
    } catch (e) {
        res.status(500).send({message: "Falha ao cadastrar cliente" + e});
    }
};

exports.refreshToken = async (req, res, next) => {
    try {
          // recupera token   
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        // decodifica token
        const data = await authService.decodeToken(token)
        
        const customer = await repository.getById(data.id);

        if(!customer){
            res.status(404).send({
                message: "Cliente não encontrado!"
            })
            return;
        }

        // pegar as informações do customer e gerar um token
        const tokenData = await authService.generateToken({
        id: customer._id,
        email: customer.email,
        name: customer.name,
        roles: customer.roles
        })

        res.status(201).send({
            token: tokenData,
            data: {
                email: customer.email,
                name: customer.name
            }
    });
    } catch (e) {
        res.status(500).send({message: "Falha ao cadastrar cliente" + e});
    }
};

