require('dotenv').config();

module.exports = {
    development: {
        username: "root",
        password: process.env.SEQUELIZE_PASSWORD,
        database: "nodebird_se",
        host: "mysql",
        dialect: "mysql",
        operatorsAliases: false
    },
    production: {
        username: "root",
        password: process.env.SEQUELIZE_PASSWORD,
        database: "nodebird_se",
        host: "mysql",
        dialect: "mysql",
        operatorsAliases: false,
        logging: false
    }
};