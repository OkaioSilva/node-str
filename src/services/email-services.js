'use strict'
const config = require('../config')
require('dotenv').config();

const nodeMailer = require('nodemailer')

const transporter = nodeMailer.createTransport({
    host: process.env.EM_HOST,
    port: process.env.EM_PORT,
    auth:{
        user:process.env.EM_USER,
        pass: process.env.EM_PASS
    }

})

const sendEmail = (to, subject, body ) =>{
    transporter.sendMail({
        from: '"Node Store" <MS_JQRMc8@trial-yzkq3407wv0ld796.mlsender.net>',
        replyTo:'Souza_kaio@hotmail.com',
        to,
        subject,
        html: body
    })
}

module.exports = sendEmail

