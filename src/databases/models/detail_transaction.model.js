const db_config = require("../index.database.js")

const model = db_config.sequelize.define("detail_transaction", {
    id: {
        type: db_config.Sequelize.STRING,
        primaryKey: true,
        unique: true
    },
    transaction_id: {
        type: db_config.Sequelize.STRING
    },
    product_id: {
        type: db_config.Sequelize.STRING
    },
    qty: {
        type: db_config.Sequelize.INTEGER
    }
}, { timestamps: true })

module.exports = model