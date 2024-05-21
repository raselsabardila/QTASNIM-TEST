const { api } = require("../configs/router/prefix.config")
const api_response = require("../libs/response/response.lib")

const express = require("express")

const router = express.Router()

router.get(
    `${ api }`,
    (req, res) => api_response(200, res, req, {
        status: true,
        message: "Welcome to Testing Service API."
    })
)

module.exports = router