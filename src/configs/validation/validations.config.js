const { check } = require("express-validator")

const create_product_validation = [
    check("name")
        .notEmpty().withMessage("name is required."),
    check("stock")
        .notEmpty().withMessage("stock is required"),
    check("category")
        .notEmpty().withMessage("category is required")
        .isIn(["Pembersih", "Konsumsi"]).withMessage("category must be Pembersih or Konsumsi.")
]

const create_transaction_validation = [
    check("date_transaction")
        .notEmpty().withMessage("date_transaction is required."),
    check("products")
        .notEmpty().withMessage("products is required.")
        .isArray().withMessage("products should be array.")
]

module.exports = {
    create_product_validation,
    create_transaction_validation
}