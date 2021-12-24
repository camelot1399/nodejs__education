const clientCheckUser = (client) => {
    client.on('client-checkUserId', (userId) => {
        const findUserWithId = Users.filter(user => user.id === userId);

        if (findUserWithId.length !== 0) {
            console.log(findUserWithId.length);
            console.log('есть такой пользователь, имя: ', findUserWithId[0].userName);
            client.emit('server-msg-auth', findUserWithId[0]);
        } else {
            client.emit('server-msg-auth', {status: 204});
        }
    });
};

module.exports = clientCheckUser;