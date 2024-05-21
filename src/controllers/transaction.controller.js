const product_model = require("../databases/models/product.model")
const transaction_model = require("../databases/models/transaction.model")
const detail_transaction_model = require("../databases/models/detail_transaction.model")
const api_response = require("../libs/response/response.lib")

const { v1 } = require("uuid")

const list_transaction = async (req, res) => {
    try {
        const transactions = await transaction_model.findAll({ include: { all: true, nested: true } })

        return api_response(200, res, req, {
            status: true,
            message: "Success get data transactions.",
            data: {
                transactions
            }
        })
    } catch (error) {
        return api_response(400, res, req, {
            status: false,
            message: error.message || "Failed get data transactions."
        })
    }
}

const create_transaction = async (req, res) => {
    try {
        let transaction = await transaction_model.create({
            id: `TSC-${ v1() }`,
            date_transaction: req.body.date_transaction
        })
        
        const promises = []

        req.body.products.forEach(product => {
            promises.push(new Promise(async (resolve, reject) => {
                try {
                    await detail_transaction_model.create({
                        id: `DTRSC-${ v1() }`,
                        transaction_id: transaction.id,
                        product_id: product.product_id,
                        qty: product.qty
                    })

                    const productUpdate = await product_model.findOne({ where: { id: product.product_id } })

                    await productUpdate.update({
                        stock: productUpdate.stock - product.qty,
                        total_sell: productUpdate.total_sell + product.qty
                    })

                    resolve(true)
                } catch (error) {
                    reject(error.message)
                }
            }))
        })

        await Promise.all(promises)

        transaction = await transaction_model.findOne({ where: { id: transaction.id }, include: { all: true, nested: true } })

        return api_response(201, res, req, {
            status: true,
            message: "Success create data transaction.",
            data: {
                transaction
            }
        })
    } catch (error) {
        return api_response(400, res, req, {
            status: false,
            message: error.message || "Failed create data transaction."
        })
    }
}

module.exports = {
    list_transaction,
    create_transaction
}