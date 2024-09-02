'use strict'
const jwt = require('jsonwebtoken')

exports.generateToken = async(data) =>{
    // aqui vamos gerar os dados
    // Vamos passar os dados que vamos imputar dentro do token, no caso o email
    return jwt.sign(data, global.SALT_KEY, {expiresIn: '1d'})

    // e retornamos o json jwt, data, salt_key e os dias para expirar o token
}

exports.decodeToken = async(token)=>{
    // recebemos um token e tentamos verificar o token
    var data =  jwt.verify(token, global.SALT_KEY);
    return data; 
}

exports.authorize = function(req, res, next){
    // essa função vai servir como interceptador, então todas as rotas que quisermos banir, bloquear do usuário, vamos utilizar essa função

    let token = req.body.token || req.query.token || req.headers['x-access-token']
    // primeira coisa: vai ver no corpo, depois olha na query, depois no headers


    if(!token){
        res.status(401).json({
            message: 'Acesso restrito'
        })
    } else{
        jwt.verify(token, global.SALT_KEY, function(error, decoded){
            if(error){
                res.status(401).json({
                    message: 'Token inválido'
                })
            } else{
                next();
            }
        })
    }
}
exports.isAdmin = function(req, res, next){
    // essa função vai servir como interceptador para saber se o cliente cadastrado é admin, ou não

    let token = req.body.token || req.query.token || req.headers['x-access-token']
    // primeira coisa: vai ver no corpo, depois olha na query, depois no headers


    if(!token){
        res.status(401).json({
            message: 'Token inválido'
        })
    } else{
        jwt.verify(token, global.SALT_KEY, function(error, decoded){
            if(error){
                res.status(401).json({
                    message: 'Token inválido'
                })
            } else{
                if(decoded.roles.includes('admin')){
                    next();
                }else{
                    res.status(403).json({
                        message: "Esta funcionalidade é restrita somente à admistradores"
                    })
                }
            }
        })
    }
}