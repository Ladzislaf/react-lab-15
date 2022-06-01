import React, {useState} from 'react';
import ReactDOM from "react-dom"
import Catalog from "../Components/Catalog";
import Search from "../Components/Search";
import Modal from "../Components/Modal";

import {useSelector, useDispatch} from "react-redux";

import {Link} from 'react-router-dom'

const CatalogPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentProduct, setCurrentProduct] = useState({})

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)

    const toggleModal = (product) => {
        if (!isModalOpen) {
            if (cart.includes(product)) return
            dispatch({type:'ADD_PROD', payload: product})
            setCurrentProduct(product)
        }
        setIsModalOpen(!isModalOpen)
    }

    const changePage = () => {
        dispatch({type: 'SET_PAGE', payload: '3'})
    }

    return (
        <div style={{textAlign: 'center'}}>
            <Search toggleModal={toggleModal}/>
            <Catalog toggleModal={toggleModal}/>
            {isModalOpen &&
                ReactDOM.createPortal(
                    <Modal onCloseModal={toggleModal}>
                        <h3>Product was added to cart</h3>
                        <div className={'prodInfo'}>
                            <h5 style={{color:'yellow'}}>{currentProduct.name.toUpperCase()}</h5>
                            <p>Price: {(currentProduct.price * (1 - currentProduct.discount / 100)).toFixed(2)}$</p>
                            <p>Products in cart: <span style={{color:'yellow'}}>{cart.length}</span></p>
                        </div>
                        <p><Link id={'3'} to={'/third'} onClick={changePage}><button className={'btn'}>Product registration</button></Link></p>
                        <p><button className={'btn'} onClick={toggleModal}>Continue prod viewing</button></p>
                    </Modal>,
                    document.getElementById('portal')
                )
            }
        </div>
    );
};

export default CatalogPage;