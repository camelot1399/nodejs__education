const [Users] = require('../../store');

const clientCheckCount = (client) => {
    client.emit('server-msg-userCountOnline', Users.length);
    client.broadcast.emit('server-msg-userCountOnline', Users.length);
};

module.exports = clientCheckCount;