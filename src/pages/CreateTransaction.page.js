import React, { Fragment, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { listProduct } from "../libs/requests/Product.lib"
import { createTransaction } from "../libs/requests/Transaction.lib"

const CreateTransaction = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [form, setForm] = useState({
        date_transaction: new Date(),
        products: [
            {
                product_id: "",
                qty: 0
            }
        ]
    })

    useEffect(() => {
        const init = async () => {
            const responseListProduct = await listProduct()

            setProducts([...responseListProduct])
        }

        init()
    }, [])

    const submitTransaction = async () => {
        if(form.date_transaction && form.products.length) {
            const responseCreateTransaction = await createTransaction(form)

            if(responseCreateTransaction) {
                setForm({
                    date_transaction: new Date(),
                    products: [
                        {
                            product_id: "",
                            qty: 0
                        }
                    ]
                })

                navigate("/")
            } else {
                alert("Failed create transaction")
            }
        } else {
            alert("Please fill form.")
        }
    }

    console.log(form)

    return (
        <Fragment>
            <main
                className="w-full min-h-screen px-10 md:px-20 py-10"
            >
                <label for="date_transaction">
                    Date Transaction
                </label>
                <input type="date" name="date_transaction" value={ form.date_transaction } onChange={ (event) => setForm({ ...form, date_transaction: event.target.value }) } className="w-full p-3 border border-gray-400 rounded-md text-sm mb-5"/>
                <label for="date_transaction">
                    List of Products
                </label>
                {
                    React.Children.toArray(form.products.map((item, index) => {
                        return (
                            <div
                                className="w-full flex flex-row items-center justify-between mt-2"
                            >   
                                <select name="product_id" id="" className="flex-1 border mr-5 bg-white p-3 rounded-md" value={ form.products[index].product_id } onChange={ (event) => {
                                    const dataFP = form.products

                                    dataFP[index].product_id = event.target.value

                                    setForm({ ...form, products: [...dataFP] })
                                } }>
                                    <option value="">Select product...</option>
                                    {
                                        React.Children.toArray(products.map(product => {
                                            return (
                                                <option value={ product.id }>{ product.name }</option>
                                            )
                                        }))
                                    }
                                </select>
                                <input type="number" name="qty" className="flex-1 p-3 border border-gray-400 rounded-md text-sm" value={ form.products[index].qty } onChange={ (event) => {
                                    const dataFP = form.products

                                    dataFP[index].qty = event.target.value

                                    setForm({ ...form, products: [...dataFP] })
                                } }/>
                            </div>
                        )
                    }))
                }
                <button
                    className="px-4 py-3 bg-blue-600 text-base text-white mt-5 rounded-md"
                    onClick={ () => {
                        const dataFP = form.products

                        dataFP.push({
                            product_id: "",
                            qty: 0
                        })

                        setForm({ ...form, products: [...dataFP] })
                    } }
                >
                    Add Products
                </button>
                <br/><br/><br/><br/>
                <button
                    className="px-4 py-3 bg-blue-600 text-base text-white rounded-md"
                    onClick={ () => submitTransaction() }
                >
                    Submit Transaction
                </button>
            </main>
        </Fragment>
    )
}

export default CreateTransaction