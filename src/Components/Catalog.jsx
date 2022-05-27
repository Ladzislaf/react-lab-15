import React, {useState} from 'react'
import '../App.css'

import {useDispatch, useSelector} from "react-redux";

const Catalog = ({toggleModal}) => {
    const cart = useSelector(state => state.cart)
    const productsList = useSelector(state => state.products)
    const dispatch = useDispatch()

    // asc - по возрастанию, desc - по убыванию
    const [sort, setSort] = useState('asc')

    const byField = (field, type) => { // сортировка массива объектов
        switch (type) {
            case 'asc':
                return (a, b) => a[field] > b[field] ? 1 : -1;
            case 'desc':
                return (a, b) => a[field] < b[field] ? 1 : -1;
            default:
        }
    }

    const sortProductsList = (e) => {
        let copy = productsList.slice()
        let value = e.target.value
        let field

        switch (value) {
            case 'Row': field = 'id'; break
            case 'Name': field = 'name'; break
            case 'Price': field = 'price'; break
            case 'Count': field = 'count'; break
            case 'Discount': field = 'discount'; break
            case 'Weight': field = 'weight'; break
            default:
        }

        copy.sort(byField(field, sort))

        if (sort === 'asc') setSort('desc')
        else setSort('asc')

        // set new products first
        let newProductsList = [], indexToSlice = []
        for (let i = 0; i < copy.length; i++) {
            if (copy[i].new) {
                newProductsList.push(copy[i])
                indexToSlice.push(i)
            }
        }

        // remove new products
        indexToSlice.map((el, i) => copy.splice(el - i, 1))

        dispatch({type:'CHANGE_PRODS', payload: [...newProductsList, ...copy]})
    }

    const addToCart = (product) => {
        toggleModal(product)
    }

    return (
        <div className={'catalogContainer'}>
            <div className={'catalogSorts'}>
                <h3>Sort by:</h3>
                <input type="button" value={'Name'} onClick={sortProductsList}/>
                <input type="button" value={'Price'} onClick={sortProductsList}/>
                <input type="button" value={'Discount'} onClick={sortProductsList}/>
                <input type="button" value={'Count'} onClick={sortProductsList}/>
                <input type="button" value={'Weight'} onClick={sortProductsList}/>
            </div>
            {productsList && productsList.map((product) => {
                return (
                    <div key={product.id} className={'catalogItem'}>
                        {product.new && <p className={'new'}>NEW!</p>}
                        <h2>{product.name.toUpperCase()}</h2>
                        <img src={product.image} alt="" style={{width: '200px'}}/>
                        {product.discount ?
                            <div>Price: {(product.price * (1 - product.discount / 100)).toFixed(2)}$ <s>{product.price}$</s></div> :
                            <div>Price: {product.price}$</div>}
                        <div>{product.description}</div>
                        <div>Count: {product.count}</div>
                        <div>Weight: {product.weight} g.</div>
                        {product.discount > 0 && <div className={'discount'}>-{product.discount}%</div>}
                        <input disabled={(product.count < 1) || cart.includes(product)} className={'btn'} type="button" value={'Add to cart'} onClick={() => addToCart(product)}/>
                    </div>
                )
            })}
        </div>
    )
}

export default Catalog
