const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    dialect: "mysql",
    host: process.env.MY_SQL_HOST,
    port: process.env.MY_SQL_PORT,
    database: process.env.MY_SQL_DATABASE,
    username: process.env.MY_SQL_USERNAME,
    password: process.env.MY_SQL_PASSWORD
});

module.exports = sequelize;
