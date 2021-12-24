const [Users] = require('../store');

const FindIndexUser = (client) => {
    return Users.findIndex(el => el.id === client.id);
}

module.exports = FindIndexUser;