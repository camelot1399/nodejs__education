let [Users] = require('../../store');
const findUser = require('../../utils/findUser');
const findIndexUser = require('../../utils/findIndexUser');

const clientDisconnect = (client) => {
    client.on('disconnect', () => {
        console.log('user disconnected', client.id);   

        let user = findUser(client);
        let index = findIndexUser(client);

        Users.splice(index, 1);

        client.emit('server-msg-userOut', user);
        client.broadcast.emit('server-msg-userOut', user);
    })
}

module.exports = clientDisconnect;