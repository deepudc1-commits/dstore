import React from 'react'
import { Form, redirect } from 'react-router-dom'
import FormInput from '../components/FormInput'
import { useSelector } from 'react-redux';
import { customFetch, formatPrice } from '../utils';
import { toast } from 'react-toastify';
import { clearCart } from '../features/cart/cartSlice';

export const loader = (store) => () => {
  const userExists = store.getState().userState.user
  if(!userExists) {
    return redirect("/")
  }
  return null
}

export const action = (store) => async({request}) => {
  const formData = await request.formData();
  const {name, address} = Object.fromEntries(formData)

  const {cartItems, itemsInCart, grandTotal} = store.getState().cart
  const {token} = store.getState().userState.user
  
  const info = {name, address, chargeTotal: grandTotal, orderTotal: formatPrice(grandTotal), numItemsInCart: itemsInCart, cartItems}

  try {
    const response = await customFetch.post("/orders", {data: info}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response);
    store.dispatch(clearCart());
    toast.success("Your order has been taken!")
    return redirect("/orders")
  } catch (error) {
    const errorMessage = error?.response?.data?.error?.message
    toast.error(errorMessage)
    if(error.response.status === 401) return redirect("/login")
    return null
  }
}

const Checkout = () => {
  const {itemsInCart, cartTotal, tax, shipping, grandTotal} = useSelector((state) => state.cart );
  if(itemsInCart === 0) {
    return (
      <div className="border-b border-base-300 pb-5">
        <h2 className="text-3xl font-medium tracking-wider capitalize">There are no items in your cart</h2>
      </div>
    )
  }

  return (
    <>
      <div className="border-b border-base-300 pb-5">
        <h2 className="text-3xl font-medium tracking-wider capitalize">place your order</h2>
      </div>
      <div className='mt-8 grid gap-8 lg:grid-cols-12'>
        <div className='lg:col-span-6 items-start'>
          <Form method='POST' className='flex flex-col gap-y-4'>
            <h4 className="font-medium text-xl capitalize">shipping information</h4>
            <FormInput type="text" text="Full name" name="name" />
            <FormInput type="text" text="Address" name="address" />
            <div className="mt-4">
              <button type="submit" className="btn btn-primary btn-block">place your order</button>
            </div>
          </Form>
        </div>
        
        <div className="lg:col-span-6 lg:pl-4">
          <div className="card bg-base-200">
            <div className="card-body">
              <p className="flex justify-between text-xs border-b border-base-300 pb-2"><span>Subtotal</span><span className="font-medium">{formatPrice(cartTotal)}</span></p>
              <p className="flex justify-between text-xs border-b border-base-300 pb-2"><span>Shipping</span><span className="font-medium">{formatPrice(shipping)}</span></p>
              <p className="flex justify-between text-xs border-b border-base-300 pb-2"><span>Tax</span><span className="font-medium">{formatPrice(tax)}</span></p>
              <p className="flex justify-between text-sm mt-4 pb-2"><span>Order Total</span><span className="font-medium">{formatPrice(grandTotal)}</span></p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout
