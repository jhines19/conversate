const sequelize = require('../config/connection');
const { Post, Comment, User } = require('../models');
const seedPosts = require('./postData');
const seedUsers = require('./userData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();

  await seedPosts();

  process.exit(0);
};

seedAll();