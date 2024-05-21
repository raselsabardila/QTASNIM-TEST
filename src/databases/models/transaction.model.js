const db_config = require("../index.database.js")

const model = db_config.sequelize.define("transaction", {
    id: {
        type: db_config.Sequelize.STRING,
        primaryKey: true,
        unique: true
    },
    date_transaction: {
        type: db_config.Sequelize.STRING
    }
}, { timestamps: true })

module.exports = model