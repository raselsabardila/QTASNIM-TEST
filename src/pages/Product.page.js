import React, { Fragment, useEffect, useState } from "react"
import { listProduct, deleteProduct  } from "../libs/requests/Product.lib"
import { Link } from "react-router-dom"
import Chart from "react-apexcharts";

const Product = () => {
    const [products, setProducts] = useState([])
    const [keyword, setKeyword] = useState("")

    useEffect(() => {
        const init = async () => {
            const responseListProduct = await listProduct()

            setProducts([...responseListProduct])
        }

        init()
    }, [])

    const getData = () => {
        if(keyword) {
            let data = []

            products.forEach(product => {
                if(product.name.toLowerCase().includes(keyword.toLowerCase())) {
                    data.push(product)
                }
            })

            return data
        } else {
            return products
        }
    }

    const submitDeleteProduct = async (id) => {
        const confirm = window.confirm("Are you sure delete this product?")

        if(confirm === true) {
            const responseDeleteProduct = await deleteProduct(id)
            const responseListProduct = await listProduct()

            setProducts([...responseListProduct])

            if(responseDeleteProduct) {
                alert("Success delete product")
            } else {
                alert("Failed delete product")
            }
        }
    }

    return (
        <Fragment>
            <main
                className="w-full min-h-screen px-10 md:px-20 py-10"
            >
                <div
                    className="w-full flex flex-row items-center justify-between"
                >
                    <input
                        type="text"
                        placeholder="Search by name..."
                        className="w-[300px] p-3 rounded-lg bg-white border border-gray-400 text-sm"
                        value={ keyword }
                        onChange={(event) => setKeyword(event.target.value)}
                    />
                    <Link
                        to={ "/products/create" }
                    >
                        <button
                            className="px-4 py-3 rounded-lg bg-gray-900 text-white"
                        >
                            Add Product
                        </button>
                    </Link>
                </div>
                <table
                    className="w-full mt-5"
                >
                    <thead
                        className="bg-gray-100 h-14"
                    >
                        <th
                            className="text-center"
                        >
                            ID
                        </th>
                        <th className="text-center">
                            NAME
                        </th>
                        <th className="text-center">
                            STOCK
                        </th>
                        <th className="text-center">
                            AMOUNT SELL
                        </th>
                        <th className="text-center">
                            ACTION
                        </th>
                    </thead>
                    <tbody>
                        {
                            getData().length ?
                            React.Children.toArray(getData().map(product => {
                                return (
                                    <tr className="text-center h-16">
                                        <td>{ product.id }</td>
                                        <td>{ product.name }</td>
                                        <td>{ product.stock } left</td>
                                        <td>{ product.total_sell }</td>
                                        <td>
                                            <div
                                                className="flex flex-row items-center justify-center"
                                            >
                                                <button
                                                    className="w-10 h-10 rounded-md bg-red-500 flex items-center mr-2 justify-center"
                                                    onClick={ () => submitDeleteProduct(product.id) }
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                    </svg>
                                                </button>
                                                <Link
                                                    to={ `/products/edit/${ product.id }` }
                                                >
                                                    <button
                                                        className="w-10 h-10 rounded-md bg-blue-500 flex items-center justify-center"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                                        </svg>
                                                    </button>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })) : 
                            <tr>
                                <td colSpan={ 5 } className="text-center">
                                    Data not found
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
                <br/>
                <hr/>
                <br/>
                <Chart
                    options={{
                        chart: {
                            id: "basic-bar"
                        },
                        xaxis: {
                            categories: products.map(item => item.name)
                        }
                    }}
                    series={[
                        {
                            name: "Amount Sell",
                            data: products.map(item => item.total_sell)
                        }
                    ]}
                    type="bar"
                    width={"100%"}
                />
            </main>
        </Fragment>
    )
}

export default Product