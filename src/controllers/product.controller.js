const product_model = require("../databases/models/product.model")
const api_response = require("../libs/response/response.lib")

const { v1 } = require("uuid")

const list_product = async (req, res) => {
    try {
        const products = await product_model.findAll()

        return api_response(200, res, req, {
            status: true,
            message: "Success create data product.",
            data: {
                products
            }
        })
    } catch (error) {
        api_response(400, res, req, {
            status: false,
            message: error.message || "Failed get data products."
        })
    }
}

const create_product = async (req, res) => {
    try {
        const product = await product_model.create({
            id: `PRD-${ v1() }`,
            ...req.body 
        })

        return api_response(201, res, req, {
            status: true,
            message: "Success create data product.",
            data: {
                product
            }
        })
    } catch (error) {
        api_response(400, res, req, {
            status: false,
            message: error.message || "Failed create data product."
        })
    }
}

const show_product = async (req, res) => {
    try {
        const product = await product_model.findOne({ where: { id: req.params.id } })

        if(!product) return api_response(404, res, req, {
            status: false,
            message: "Product not found."
        })

        return api_response(200, res, req, {
            status: true,
            message: "Success get data product.",
            data: {
                product
            }
        })
    } catch (error) {
        api_response(400, res, req, {
            status: false,
            message: error.message || "Failed get data product."
        })
    }
}

const edit_product = async (req, res) => {
    try {
        const product = await product_model.findOne({ where: { id: req.params.id } })

        if(!product) return api_response(404, res, req, {
            status: false,
            message: "Product not found."
        })

        if(req.body.stock < 0) return api_response(400, res, req, {
            status: false,
            message: "Stock cannot less than 0."
        })

        await product.update({ ...req.body })

        return api_response(200, res, req, {
            status: true,
            message: "Success edit data product.",
            data: {
                product
            }
        })
    } catch (error) {
        api_response(400, res, req, {
            status: false,
            message: error.message || "Failed edit data product."
        })
    }
}

const delete_product = async (req, res) => {
    try {
        const product = await product_model.findOne({ where: { id: req.params.id } })

        if(!product) return api_response(404, res, req, {
            status: false,
            message: "Product not found."
        })

        await product.destroy()

        return api_response(200, res, req, {
            status: true,
            message: "Success delete data product."
        })
    } catch (error) {
        api_response(400, res, req, {
            status: false,
            message: error.message || "Failed delete data product."
        })
    }
}

module.exports = {
    list_product,
    create_product,
    show_product,
    edit_product,
    delete_product
}