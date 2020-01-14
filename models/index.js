'use strict';

const path = require('path');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const env = process.env.NODE_ENV || 'development';
//const config = require(__dirname + '/../config/config.json')[env];
/* ******************************************************** */
const config = require(__dirname+'/../config/config')[env];

/* ******************************************************** */

const db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Op;

db.User = require('./user')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.Hashtag = require('./hashtag')(sequelize, Sequelize);

//////////////////////////////////////////////////////////////////////

db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);  //posts table에 userId 생성

db.Post.belongsToMany(db.Hashtag, {   //n:n posts table은 postHashtag table의 hashtagId를 통해 hashtags table에 접금, as, foreignKey 미 명시시 자동 생성
  foreignKey: 'postId',
  as: 'Hashtags',
  through: 'PostHashtag'
});

db.Hashtag.belongsToMany(db.Post, { //n:n hashtags table은 postHashtag table의 postId를 통해 posts table에 접근
  foreignKey: 'hashtagId',
  as: 'Posts',
  through: 'PostHashtag'
});

db.User.belongsToMany(db.User, {  //동일 users table 내에서  n:n으로,  별도 Follow table의 as =>, <=foreignKey 생성, follwing기준으로 해당 follwingId와 follwerId를 Follow table에 저장, 삭제, get
  foreignKey: 'followingId',  
  as: 'Followers',
  through: 'Follow'
});

db.User.belongsToMany(db.User, { //동일 users table 내에서 n:n으로, 별도 Follow table 생성 및 as=>, <=foreignKey 생성, follower 기준으로 해당 follwerId와 followingId를 Follow table에 저장, 삭제,get
  foreignKey: 'followerId',
  as: 'Followings',
  through: 'Follow'
});


module.exports = db;
