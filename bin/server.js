
//1 - importar o http, o debug, e o app
const app = require('../src/app')
const http = require("http")
const debug = require("debug")("kaio:server")


//2 - criando a porta:
    const port = normalizePort(process.env.PORT || "3000");
    app.set('port', port)

//3 - criando o servidor
    const server = http.createServer(app)

//5 - pedir para o servirdor ficar ouvindo:
    server.listen(port)
    server.on('error', onError)
    server.on('listening', onListening)
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

//Gerenciando Erros do Servidor
function onError(error){
    if(error.syscall !== 'listen'){
        throw error;
    }

    const bind = typeof port == 'string' ? 'Pipe ' + port : 'Port ' + port;

    switch (error.code){
        case 'EACCES' :
            console.error( bind + 'requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + 'is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening(){
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe' + addr :   'pipe' + addr.port;
    debug('listening on ' + bind)
}