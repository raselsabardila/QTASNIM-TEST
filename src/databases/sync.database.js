const product_model = require("./models/product.model")
const transaction_model = require("./models/transaction.model")
const detail_transaction_model = require("./models/detail_transaction.model")

const sync = () => {
    product_model.sync()
    transaction_model.sync()
    detail_transaction_model.sync()
    
    transaction_model.hasMany(detail_transaction_model, {
        foreignKey: "transaction_id",
        as: "detail_transactions"
    })

    detail_transaction_model.belongsTo(product_model, {
        foreignKey: "product_id",
        as: "product"
    })
}

module.exports = sync