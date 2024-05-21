const { api } = require("../configs/router/prefix.config")
const { list_product, create_product, show_product, edit_product, delete_product } = require("../controllers/product.controller")
const init_validation = require("../configs/validation/init_validation.config")
const { create_product_validation } = require("../configs/validation/validations.config")

const express = require("express")

const router = express.Router()

router.route(`${ api }/products`)
    .get(
        (req, res) => list_product(req, res)
    )
    .post(
        create_product_validation,
        init_validation,
        (req, res) => create_product(req, res)
    )

router.route(`${ api }/product/:id`)
    .get(
        (req, res) => show_product(req, res)
    )
    .patch(
        init_validation,
        edit_product,
        (req, res) => edit_product(req, res)
    )
    .delete(
        (req, res) => delete_product(req, res)
    )

module.exports = router