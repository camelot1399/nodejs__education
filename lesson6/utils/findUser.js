const [Users] = require('../store');

const FindUser = (client) => {
    return Users.find(el => el.id === client.id);
}

module.exports = FindUser;