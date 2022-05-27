import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from "./Components/NavBar";
import CatalogPage from './Pages/CatalogPage'
import LoginPage from './Pages/LoginPage'
import CartPage from './Pages/CartPage'

const App = () => {
    return (
        <div>
            <NavBar/>
            <Routes>
                <Route path={'/first'} element={<CatalogPage/>}></Route>
                <Route path={'/second'} element={<LoginPage/>}></Route>
                <Route path={'/third'} element={<CartPage/>}></Route>
            </Routes>
        </div>
    )
}

export default App
