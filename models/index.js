const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: "CASCADE",
  onUpdate: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
  onUpdate: 'CASCADE'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  hooks: true,
  // onDelete: "CASCADE"
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  hooks: true,
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  hooks: true,
  //onDelete: "CASCADE"
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  hooks: true,
});

module.exports = { User, Post, Comment };