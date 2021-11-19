const { User } = require('../models')

const userData = [
    {
        username: "testusername",
        password: "testpassword"
    },
    {
        username: "testusername1",
        password: "testpassword1"
    },
    {
        username: "testusername2",
        password: "testpassword2"
    },
];

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = seedUsers;