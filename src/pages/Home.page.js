import React, { Fragment, useEffect, useState } from "react"
import { listTransaction } from "../libs/requests/Transaction.lib"
import { listProduct  } from "../libs/requests/Product.lib"
import { Link } from "react-router-dom"

const Home = () => {
    const [transactions, setTransactions] = useState([])
    const [products, setProducts] = useState([])
    const [filterName, setFilterName] = useState("")
    const [filterDate, setFilterDate] = useState("")

    useEffect(() => {
        const init = async () => {
            const responseListTransaction = await listTransaction()
            const responseListProduct = await listProduct()

            setProducts([...responseListProduct])
            setTransactions([...responseListTransaction])
        }

        init()
    }, [])

    const getData = () => {
        let result = transactions

        if(filterName && filterDate) {
            let newResult = []

            result.forEach((item, index) => {
                item.detail_transactions.forEach((itemDt) => {
                    if(itemDt.product.id == filterName) {
                        newResult.push(item)
                    }
                });
            });

            result = newResult.filter((item => {
                if(item.date_transaction == filterDate) {
                    return item
                }
            }))
        } else if(filterName) {
            let newResult = []

            result.forEach((item, index) => {
                item.detail_transactions.forEach((itemDt) => {
                    if(itemDt.product.id == filterName) {
                        newResult.push(item)
                    }
                });
            });

            result = [...newResult]
        } else if(filterDate) {
            result = result.filter((item => {
                if(item.date_transaction == filterDate) {
                    return item
                }
            }))
        }

        return result
    }

    return (
        <Fragment>
            <main
                className="w-full min-h-screen px-10 md:px-20 py-10"
            >
                <div
                    className="w-full flex flex-row items-center jusitfy-between mb-5"
                >
                    <select name="category" id="" className="flex-1 border bg-white p-4 mr-4 rounded-md" value={ filterName } onChange={ (event) => setFilterName(event.target.value) }>
                        <option value="">Select product....</option>
                        {
                            React.Children.toArray(products.map(product => {
                                return (
                                    <option value={ product.id }>{ product.name }</option>
                                )
                            }))
                        }
                    </select>
                    <input type="date" className="flex-1 border bg-white p-3 rounded-md" value={ filterDate } onChange={ (event) => setFilterDate(event.target.value) }/>
                </div>
                {
                    getData().length ?   
                        <div
                            className="w-full flex flex-col md:flex-row flex-wrap"
                        >
                            {
                                React.Children.toArray(getData().map(transaction => {
                                    return (
                                        <div
                                            className="md:w-1/4 bg-white border border-black-900 rounded-xl md:mr-4 mb-4 flex-shrink-0 flex-grow p-4"
                                        >
                                            <h6
                                                className="text-sm text-gray-400"
                                            >
                                                Transaction Date
                                            </h6>
                                            <h3
                                                className="text-xl text-gray-900 mt-1"
                                            >
                                                { transaction.date_transaction }
                                            </h3>
                                            <h6
                                                className="text-sm text-gray-400 mt-3 mb-2"
                                            >
                                                List Product
                                            </h6>
                                            {
                                                React.Children.toArray(transaction.detail_transactions.map(detail => {
                                                    return (
                                                        <div
                                                            className="w-full rounded-sm mb-1 bg-gray-100 px-4 py-2 flex flex-row items-center justify-between"
                                                        >
                                                            <h6
                                                                className="text-sm text-gray-900"
                                                            >
                                                                { detail.product.name }
                                                            </h6>
                                                            <h6
                                                                className="text-sm text-gray-900"
                                                            >
                                                                x { detail.qty }
                                                            </h6>
                                                        </div>
                                                    )
                                                }))
                                            }
                                        </div>
                                    )
                                }))
                            }
                        </div> : 
                        <div
                            className="w-full h-full flex items-center justify-center"
                        >
                            <h1
                                className="text-xl text-gray-900"
                            >
                                Data not found
                            </h1>
                        </div>
                }
                <div
                    className="w-full flex items-center justify-center"
                >
                    <Link
                        to={ "/transactions/create" }
                    >
                        <button
                            className="px-4 py-3 rounded-md bg-blue-400 text-white mt-5"
                        >
                            Add Transaction
                        </button>
                    </Link>
                </div>
            </main>
        </Fragment>
    )
}

export default Home