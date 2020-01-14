const redis = require('redis');
require('dotenv').config();
const logger = require('../logger');


const redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
redisClient.auth(process.env.REDIS_PASSWORD, (err)=>{
if(err){
    console.error(err);
}else{
    console.log('###########redis connect############');
}
});

redisClient.on('error', (error)=>{
    logger.info(error);
});

module.exports = redisClient;
