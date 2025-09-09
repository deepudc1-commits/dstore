import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultState = {
    cartItems: [],
    itemsInCart: 0,
    cartTotal: 0,
    tax: 0,
    shipping: 500,
    grandTotal: 0
}

const getLocalStorage = () => {
    return JSON.parse(localStorage.getItem('cart'))
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: getLocalStorage() || defaultState,
    reducers: {
        addtoCart: (state, {payload}) => {
            const {product} = payload;
            console.log(product);

            const item = state.cartItems.find((i) => i.cartID === product.cartID);
            if(item) {
                item.amount += product.amount
            }
            else {
                state.cartItems.push(product)
            }
            state.itemsInCart += product.amount;
            state.cartTotal += product.amount * product.price
            cartSlice.caseReducers.calculateTotals(state);
            toast.success("Item added to cart!")
        },
        clearCart: () => {
            localStorage.setItem('cart', JSON.stringify(defaultState))
            return defaultState
        },
        editCartItem: (state, {payload}) => {
            const {id, newCount} = payload
            console.log(id, newCount);
            const currentItem = state.cartItems.find(item => {
                if(item.cartID === id) {
                    item.amount = parseInt(newCount)
                }
            })
            state.itemsInCart = state.cartItems.reduce((acc, item) => {
                return acc += item.amount
            }, 0);
            state.cartTotal = state.cartItems.reduce((acc, item) => {
                return acc += item.amount * item.price
            }, 0);
            cartSlice.caseReducers.calculateTotals(state)
            toast.success("Cart updated!")
        },
        deleteCartItem: (state, {payload}) => {
            const {id} = payload
            const {amount, price} = state.cartItems.find((i) => i.cartID === id)
            console.log(amount, price);
            const newCartItems = state.cartItems.filter(item => item.cartID !== id)
            state.cartItems = newCartItems
            state.itemsInCart -= amount
            state.cartTotal -= amount * price
            cartSlice.caseReducers.calculateTotals(state)
            toast.error("Item removed from cart!")
        },
        calculateTotals: (state) => {
            state.tax = 0.1 * state.cartTotal
            state.grandTotal = state.tax + state.shipping + state.cartTotal;
            localStorage.setItem('cart', JSON.stringify(state))
        },
    }
})

export const {addtoCart, clearCart, editCartItem, deleteCartItem} = cartSlice.actions

export default cartSlice.reducer