const http = require('http');
const fs = require('fs');
const socket = require('socket.io');
const path = require('path');

const clientMsg = require('./socket/client/client-msg');
const clientDisconnect = require('./socket/client/client-disconnect');
const clientAuth = require('./socket/client/client-auth');
const clientCheckCount = require('./socket/client/client-checkCountUsers');
const [Users] = require('./store');

const colors = ['red', 'green', 'blue', 'pink'];
const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

const server = http.createServer((req, res) => {
    const indexPath = path.join(__dirname, 'public/index.html');
    res.writeHead(200, {'Content-Type': 'text/html'});
    const readStream = fs.createReadStream(indexPath);

    readStream.pipe(res);
});

const io = socket(server);

io.on('connection', (client) => {
    console.log('new client connetion: ', client.id);

    Users.push({
        id: client.id,
        color: colors[getRandom(0, colors.length)],
    });
    
    clientAuth(client);
    clientDisconnect(client);
    clientCheckCount(client);

    clientMsg(client);
    
});

server.listen(5555);