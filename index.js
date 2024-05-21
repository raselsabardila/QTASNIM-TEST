const cors_setting = require("./src/configs/cors/cors.config")
const sync_database = require("./src/databases/sync.database")

const welcome_route = require("./src/routes/welcome.route")
const product_route = require("./src/routes/product.route")
const transaction_route = require("./src/routes/transaction.route")

const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 8000

sync_database()

app.set("trust proxy", true)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("combined"))
app.use(cors(cors_setting))

app.use(welcome_route)
app.use(product_route)
app.use(transaction_route)

app.listen(PORT, () => {
    console.log(`Server is running on localhost:${ PORT }`)
})