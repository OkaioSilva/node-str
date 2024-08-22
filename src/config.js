require('dotenv').config()

global.SALT_KEY = process.env.SALT;
global.EMAIL_TMPL = 'Olá, <strong>{0}, seja bem vindo à node Store!</strong>';

module.exports = {
    connectionString: process.env.CONNECTION_MONGO,
    API_KEY: process.env.API_KEY,
    containerConnectionString: process.env.CONTAINERCONNECTION
}


