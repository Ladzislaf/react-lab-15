import React from 'react';
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";

const NavBar = () => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const currentUser = useSelector(state => state.currentUser)
    const currentPage = useSelector(state => state.currentPage)

    const currentPageSwitch = (e) => {
        dispatch({type: 'SET_PAGE', payload: e.target.id})
    }

    const logOut = () => {
        dispatch({type: 'SET_USER', payload: ''})
    }

    return (
        <header>
            <span style={{fontSize: '24px'}}>LADZISLAF SHOP</span>
            <Link id={'1'} className={currentPage === '1' ? 'active' : ''} to={'/first'} onClick={(e) => currentPageSwitch(e)}>Catalog</Link>
            <Link id={'2'} className={currentPage === '2' ? 'active' : ''} to={'/second'} onClick={(e) => currentPageSwitch(e)} hidden={currentUser}>Sigh in/Sign up</Link>
            <Link id={'3'} className={currentPage === '3' ? 'active' : ''} to={'/third'} onClick={(e) => currentPageSwitch(e)}>Cart ({cart.length})</Link>
            {currentUser &&
                <>
                    <span>User: {currentUser}</span>
                    <input className={'btn'} type="button" value={'Log out'} onClick={logOut}/>
                </>
            }
        </header>
    );
};

export default NavBar;