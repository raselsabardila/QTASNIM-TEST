import React, { Fragment } from "react"
import { Link, Route, Routes } from "react-router-dom"
import Home from "../pages/Home.page"
import Product from "../pages/Product.page"
import CreateProduct from "../pages/CreateProduct.page"
import EditProduct from "../pages/EditProduct.page"
import CreateTransaction from "../pages/CreateTransaction.page"

const Core = () => {
    return (
        <Fragment>
            <nav
                className="w-full px-20 py-4 bg-gray-900 flex flex-row items-center justify-between sticky"
            >
                <h1
                    className="text-white text-xl"
                >
                    Navbar
                </h1>
                <div
                    className="flex flex-row items-center"
                >
                    <Link
                        to={ "/" }
                    >
                        <h6
                            className="text-white text-md"
                        >
                            Home
                        </h6>
                    </Link>
                    <Link
                        to={ "/products" }
                    >
                        <h6
                            className="text-white text-md ml-4"
                        >
                            Product
                        </h6>
                    </Link>
                </div>
            </nav>
            <Routes>
                <Route
                    path="/"
                    element={ <Home/> }
                />
                <Route
                    path="/products"
                    element={ <Product/> }
                />
                <Route
                    path="/products/create"
                    element={ <CreateProduct/> }
                />
                <Route
                    path="/products/edit/:id"
                    element={ <EditProduct/> }
                />
                <Route
                    path="/transactions/create"
                    element={ <CreateTransaction/> }
                />
            </Routes>
        </Fragment>
    )    
}

export default Core