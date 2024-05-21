const Sequelize = require("sequelize")
require("dotenv").config()

const sequelize = new Sequelize(process.env.DB_URL, "root", "very_strong_password", {
    host: "localhost",
    dialect: "mysql",
    timezone: '+07:00',
    dialectOptions: {
        socketPath: "/opt/lampp/var/mysql/mysql.sock"
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

module.exports = {
    sequelize,
    Sequelize
}