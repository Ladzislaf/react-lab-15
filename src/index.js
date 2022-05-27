import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {Provider} from "react-redux"
import {BrowserRouter} from 'react-router-dom'

import App from './App'
import appleImageSrc from "./Images/apple.jpg";
import orangeImageSrc from "./Images/orange.jpg";
import bananaImageSrc from "./Images/banana.jpg";
import pineappleImageSrc from "./Images/pineapple.jpg";
import cucumberImageSrc from "./Images/cucumber.jpg";
import tomatoImageSrc from "./Images/tomato.jpg";
import carrotImageSrc from "./Images/carrot.jpg";

// todo если в корзине продукт не выбран - кнопка next - disabled
// todo компонент order form - изменить (сделать норм логику для выбранных продуктов)
const defaultState = {
	products: [
		{
			id: 1,
			name: "apple",
			price: 4.30,
			count: 2,
			image: appleImageSrc,
			description: 'Apples are a popular fruit, containing antioxidants, vitamins, dietary fiber, and a range of other nutrients.',
			new: true,
			discount: 5,
			weight: 150,
			selected: 1,
			checked: false,
		},
		{
			id: 2,
			name: "orange",
			price: 6.80,
			count: 25,
			image: orangeImageSrc,
			description: 'Oranges are truly an outstanding fruit. They are very healthy, cheap, and tasty, making them the ideal snack.',
			new: true,
			discount: 10,
			weight: 220,
			selected: 1,
			checked: false,
		},
		{
			id: 3,
			name: "banana",
			price: 8.00,
			count: 30,
			image: bananaImageSrc,
			description: 'Bananas are among the most important food crops on the planet.',
			new: false,
			discount: 0,
			weight: 180,
			selected: 1,
			checked: false,
		},
		{
			id: 4,
			name: "pineapple",
			price: 12.00,
			count: 7,
			image: pineappleImageSrc,
			description: 'The pineapple is a tropical plant with an edible fruit. The pineapple is indigenous to South America, where it has been cultivated for many centuries.',
			new: false,
			discount: 7,
			weight: 800,
			selected: 1,
			checked: false,
		},
		{
			id: 5,
			name: "cucumber",
			price: 3.50,
			count: 1,
			image: cucumberImageSrc,
			description: 'Cucumber is a widely-cultivated creeping vine plant in the Cucurbitaceae family that bears usually cylindrical fruits, which are used as vegetables.',
			new: false,
			discount: 5,
			weight: 670,
			selected: 1,
			checked: false,
		},
		{
			id: 6,
			name: "tomato",
			price: 4.20,
			count: 0,
			image: tomatoImageSrc,
			description: 'The tomato is the edible berry of the plant Solanum lycopersicum, commonly known as the tomato plant.',
			new: false,
			discount: 0,
			weight: 550,
			selected: 1,
			checked: false,
		},
		{
			id: 7,
			name: "carrot",
			price: 3.00,
			count: 45,
			image: carrotImageSrc,
			description: 'The carrot is a root vegetable often claimed to be the perfect health food. It is crunchy, tasty, and highly nutritious.',
			new: false,
			discount: 50,
			weight: 530,
			selected: 1,
			checked: false,
		},
	],
	cart: [],
	users: [],
	currentUser: '',
	currentPage: '',
}

const reducer = (state = defaultState, action) => {
	switch (action.type) {
		case 'CHANGE_PRODS':
			return {...state, products: action.payload}
		case 'ADD_PROD':
			return {...state, cart: [...state.cart, action.payload]}
		case 'REMOVE_PROD':
			return {...state, cart: state.cart.filter((el) => {
					return el.id !== action.payload
				})}
		case 'ADD_USER':
			return {...state, users: [...state.users, action.payload]}
		case 'SET_USER':
			return {...state, currentUser: action.payload}
		case 'SET_PAGE':
			return {...state, currentPage: action.payload}
		default: return state
	}
}

const store = createStore(reducer)

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>,
    document.getElementById('root')
)
