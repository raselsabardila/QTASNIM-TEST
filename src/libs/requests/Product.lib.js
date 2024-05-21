import Axios from "axios"

const listProduct = async () => {
    try {
        const response = await Axios.get(
            "http://localhost:8000/api/products"
        )

        return response.data.body.data.products
    } catch (error) {
        return []
    }
}

const createProduct = async (data) => {
    try {
        const response = await Axios.post(
            "http://localhost:8000/api/products",
            data
        )

        return response.data.body.status
    } catch (error) {
        return false
    }
}

const editProduct = async (data, id) => {
    try {
        const response = await Axios.patch(
            `http://localhost:8000/api/product/${ id }`,
            data
        )

        return response.data.body.status
    } catch (error) {
        return false
    }
}

const deleteProduct = async (id) => {
    try {
        const response = await Axios.delete(
            `http://localhost:8000/api/product/${ id }`
        )

        return response.data.body.status
    } catch (error) {
        return false
    }
} 

const showProduct = async (id) => {
    try {
        const response = await Axios.get(
            `http://localhost:8000/api/product/${ id }`
        )

        return response.data.body.data.product
    } catch (error) {
        return null
    }
} 

export {
    listProduct,
    createProduct,
    deleteProduct,
    showProduct,
    editProduct
}