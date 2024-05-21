const db_config = require("../index.database.js")

const model = db_config.sequelize.define("product", {
    id: {
        type: db_config.Sequelize.STRING,
        primaryKey: true,
        unique: true
    },
    name: {
        type: db_config.Sequelize.STRING,
    },
    stock: {
        type: db_config.Sequelize.INTEGER
    },
    total_sell: {
        type: db_config.Sequelize.INTEGER,
        defaultValue: 0
    },
    category: {
        type: db_config.Sequelize.ENUM(["Konsumsi", "Pembersih"])
    }
}, { timestamps: true })

module.exports = model