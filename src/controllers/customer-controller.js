"use strict";

const ValidationContract = require("../validators/fluent-validator");
const repository = require("../repositories/customer-repository");
// 12 modulo de md5 e bcrypt para encriptar senhas dos usuários 
const bcrypt = require('bcrypt')
const md5 = require('md5')

const config = require("../config")

// mailersend
const Recipient = require('mailersend').Recipient
const EmailParams = require('mailersend').EmailParams
const MailerSend = require('mailersend').MailerSend
const Sender = require('mailersend').Sender



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
            password: md5(req.body.password + global.SALT_KEY)
        });

        //send email
        const mailerSendConfig = {apiKey: config.API_KEY}
        
        const mailerSend = new MailerSend(mailerSendConfig);
        
        const recipients = [new Recipient(req.body.email, req.body.name)];

        const sentFrom = new Sender('MS_JQRMc8@trial-yzkq3407wv0ld796.mlsender.net', 'Kaio')

        const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setSubject('Bem vindo ao node Store')
        .setHtml(global.EMAIL_TMPL.replace('{0}', req.body.name))
        try{
            await mailerSend.email.send(emailParams)
        
        }catch(e){
            console.log(e)
        }

        res.status(201).send({message: "Cliente cadastrado com sucesso",
    });
    } catch (e) {
        res.status(500).send({message: "Falha ao cadastrar cliente" + e});
    }
};

