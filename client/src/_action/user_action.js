import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    ADD_TO_CART,
    GET_CART_ITEMS,
    REMOVE_CART_ITEM
} from './types';

export function loginUser(dataToSubmit) {

    const request = axios.post('/api/users/login', dataToSubmit)
        .then(response => response.data)

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit) {

    const request = axios.post('/api/users/register', dataToSubmit)
        .then(response => response.data)

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function auth() {

    const request = axios.get('/api/users/auth')
        .then(response => response.data)

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function addToCart(id) {

    let body={
        productId : id
    }

    const request = axios.post('/api/users/addToCart', body)
        .then(response => response.data)

    return {
        type: ADD_TO_CART,
        payload: request
    }
}

export function getCartItems(cartItems, userCart) {

    const request = axios.get(`/api/product/products_by_id?id=${cartItems}&type=array`)
        .then(response => {
            // CartItem들에 해당하는 정보들을  
            // Product Collection에서 가져온후에 
            // Quantity 정보를 넣어 준다.
            userCart.forEach(cartItem => {
                response.data.forEach((productDetail, index) => {
                    if (cartItem.id === productDetail._id) {
                        response.data[index].quantity = cartItem.quantity
                    }
                })
            })
            return response.data;
        });

    return {
        type: GET_CART_ITEMS,
        payload: request
    }
}

export function removeCartItem(prodcutId) {

    const request = axios.get(`/api/users/removeCart?id=${prodcutId}&type=array`)
        .then(response => {
            //productInfo, cart정보를 조합해서 CartDetail을 만든다

            response.data.cart.forEach(item=>{
                console.log(response.data.productInfo)
                response.data.productInfo.forEach((product, index)=>{
                    if(item.id === product._id){
                        response.data.productInfo[index].quantity = item.quantity
                    }
                })
            })
            return response.data;
        });

    return {
        type: REMOVE_CART_ITEM,
        payload: request
    }
}