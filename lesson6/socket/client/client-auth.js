const [Users] = require('../../store');
const findIndexUser = require('../../utils/findIndexUser');

const clientAuth = (client) => client.on('client-auth', (message) => {
    
    let index = findIndexUser(client);
    Users[index].name = message.userName;

    client.emit('server-msg-auth', {status: 200});
    client.broadcast.emit('server-msg-userConneсted', message.userName);
});

module.exports = clientAuth;