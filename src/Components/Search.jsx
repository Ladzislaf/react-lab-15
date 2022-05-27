import React, {useState} from 'react'
import '../App.css'
import {useSelector} from "react-redux";

const Search = () => {
    const productsList = useSelector(state => state.products)

    const [searchType, setSearchType] = useState('accurate search')
    const [resultList, setResultList] = useState([])

    const searchHandler = (e) => {
        switch (searchType) {
            case 'accurate search':
                setResultList(productsList.filter((item) => {
                    return item.name === e.target.value
                }))
                break
            case 'partial search':
                let reg = new RegExp(`.*${e.target.value}.*`, 'g')
                if (e.target.value !== '')
                    setResultList(productsList.filter((item) => {
                        return item.name.match(reg)
                    }))
                else setResultList([])
                break
            default:
        }
    }

    return (
        <div className={'searchBlock'}>
            <select onChange={(e) => setSearchType(e.target.value)}>
                <option>accurate search</option>
                <option>partial search</option>
            </select>
            <h5 style={{fontSize: '24px'}}>Input name to search:</h5>
            <input type="text" placeholder={'name'} onChange={searchHandler}/>

            {resultList.map((product) => {
                return (
                    <div key={product.id} className={'searchItem'}>
                        <h2>{product.name.toUpperCase()}</h2>
                        <img src={product.image} alt="" style={{width: '100px'}}/>
                        {product.discount ?
                            <div>Price: {(product.price * (1 - product.discount / 100)).toFixed(2)}$ <s>{product.price}$</s></div> :
                            <div>Price: {product.price}$</div>}
                        <div>{product.description}</div>
                        <div>Count: {product.count}</div>
                        {product.discount > 0 && <div className={'discount'}>-{product.discount}%</div>}
                    </div>
                )
            })}
        </div>
    )
}

export default Search