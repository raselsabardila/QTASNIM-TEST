import Axios from "axios"

const listTransaction = async () => {
    try {
        const response = await Axios.get(
            "http://localhost:8000/api/transactions"
        )

        return response.data.body.data.transactions
    } catch (error) {
        return []
    }
}

const createTransaction = async (data) => {
    try {
        const response = await Axios.post(
            "http://localhost:8000/api/transactions",
            data
        )

        return response.data.body.status
    } catch (error) {
        return false
    }
}

export {
    listTransaction,
    createTransaction
}