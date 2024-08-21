'use strict'
const config = require('../config')

const nodeMailer = require('nodemailer')

const transporter = nodeMailer.createTransport({
    host: 'smtp.mailersend.net',
    port: 587,
    auth:{
        user:'MS_JQRMc8@trial-yzkq3407wv0ld796.mlsender.net',
        pass: 'D3pc8PSuEhrjZBBo'
    }

})

const sendEmail = (to, subject, body ) =>{
    transporter.sendMail({
        from: '"Node Store"<MS_JQRMc8@trial-yzkq3407wv0ld796.mlsender.net>',
        replyTo:'Souza_kaio@hotmail.com',
        to,
        subject,
        html: body
    })
}

module.exports = sendEmail