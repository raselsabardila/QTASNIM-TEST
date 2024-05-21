const { api } = require("../configs/router/prefix.config")
const init_validation = require("../configs/validation/init_validation.config")
const { create_transaction_validation, } = require("../configs/validation/validations.config")

const express = require("express")
const { list_transaction, create_transaction } = require("../controllers/transaction.controller")

const router = express.Router()

router.route(`${ api }/transactions`)
    .get(
        (req, res) => list_transaction(req, res)
    )
    .post(
        create_transaction_validation,
        init_validation,
        (req, res) => create_transaction(req, res)
    )

module.exports = router