const http = require('http');
const PORT = 12345;
const handlers = require('./handlers/index')

http.createServer((req, res) => {
    for(let handler of handlers){
        if(!handler(req, res)){
            break;
        }
    }
}).listen(PORT);