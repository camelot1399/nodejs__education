const [Users] = require('../../store');
const findUser = require('../../utils/findUser');
const moment = require('moment');

const clientMsg = (client) => {
    client.on('client-msg', (data) => {

        let dateTime = moment();

        let newMessage = {
            userId: client.id,
            message: data.message,
            date: dateTime.format('DD-MM-YYYY HH:MM:ss'),
        };
        

        let user = findUser(client);
        let payload = {
            Users,
            user,
            message: newMessage
        };

        console.log(Users);

        client.emit('server-msg', payload);
        client.broadcast.emit('server-msg', payload);

        console.log(Users.length);
    });
};

module.exports = clientMsg;