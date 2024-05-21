import React, { Fragment, useEffect, useState } from "react"
import { editProduct, showProduct } from "../libs/requests/Product.lib"
import { useNavigate, useParams } from "react-router-dom"

const EditProduct = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [form, setForm] = useState({
        name: "",
        stock: 0,
        category: ""
    })

    useEffect(() => {
        const init = async () => {
            const responseShowProduct = await showProduct(params.id)

            if(params !== null) {
                setForm({
                    name: responseShowProduct.name,
                    stock: responseShowProduct.stock,
                    category: responseShowProduct.category
                })
            } else {
                navigate("/products")
            }
        }

        init()
    }, [])

    const submitProduct = async () => {
        if(form.name && form.stock && form.category) {
            const responseEditProduct = await editProduct(form, params.id)

            if(responseEditProduct) {
                navigate("/products")
            } else {
                alert("Failed edit data product")
            }
        } else {
            alert("Please fill form.")
        }
    }

    return (
        <Fragment>
            <main
                className="w-full min-h-screen px-10 md:px-20 py-10"
            >
                <label for="name">
                    Name Product
                </label>
                <input type="text" name="name" value={ form.name } onChange={ (event) => setForm({ ...form, name: event.target.value }) } className="w-full p-3 border border-gray-400 rounded-md text-sm mb-5"/>
                <label for="stock">
                    Stock Product
                </label>
                <input type="number" name="stock" value={ form.stock } onChange={ (event) => setForm({ ...form, stock: event.target.value }) } className="w-full p-3 border border-gray-400 rounded-md text-sm mb-5"/>
                <label for="category">
                    Category Product
                </label>
                <select name="category" value={ form.category } onChange={ (event) => setForm({ ...form, category: event.target.value }) } className="w-full p-3 border bg-white border-gray-400 rounded-md text-sm mb-5" >
                    <option value="">Select Category</option>
                    <option value="Konsumsi">Konsumsi</option>
                    <option value="Pembersih">Pembersih</option>
                </select>
                <button
                    className="px-4 py-3 bg-blue-600 text-base text-white mt-5 rounded-md"
                    onClick={ () => submitProduct() }
                >
                    Submit Product
                </button>
            </main>
        </Fragment>
    )
}

export default EditProduct