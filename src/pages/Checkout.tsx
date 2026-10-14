import React from 'react'
import { ActionFunctionArgs, Form, Link, redirect } from 'react-router-dom'
import { AxiosError } from 'axios';
import { QueryClient } from '@tanstack/react-query';
import FormInput from '../components/FormInput'
import CartTotals from '../components/CartTotals'
import PageHeader from '../components/PageHeader'
import { useSelector } from 'react-redux';
import { customFetch, formatPrice } from '../utils';
import { toast } from 'react-toastify';
import { clearCart } from '../features/cart/cartSlice';
import { AppStore, RootState } from '../store';
import { ApiErrorBody } from '../types';

export const loader = (store: AppStore) => () => {
  const userExists = store.getState().userState.user
  if(!userExists) {
    return redirect("/")
  }
  return null
}

export const action = (store: AppStore, queryClient: QueryClient) => async({request}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const {name, address} = Object.fromEntries(formData)

  const {cartItems, itemsInCart, grandTotal} = store.getState().cart
  const {token} = store.getState().userState.user!
  
  const info = {name, address, chargeTotal: grandTotal, orderTotal: formatPrice(grandTotal), numItemsInCart: itemsInCart, cartItems}

  try {
    const response = await customFetch.post("/orders", {data: info}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response);
    store.dispatch(clearCart());
    queryClient.invalidateQueries({ queryKey: ['orders'] })
    toast.success("Your order has been taken!")
    return redirect("/orders")
  } catch (e) {
    const error = e as AxiosError<ApiErrorBody>
    const errorMessage = error?.response?.data?.error?.message
    toast.error(errorMessage)
    if(error.response!.status === 401) return redirect("/login")
    return null
  }
}

const Checkout = () => {
  const {itemsInCart} = useSelector((state: RootState) => state.cart );
  if(itemsInCart === 0) {
    return (
      <div className="align-element py-24">
        <div className="mx-auto max-w-lg rounded-[2rem] border border-dashed border-base-300 px-8 py-16 text-center">
          <h2 className="font-display text-3xl font-semibold">There are no items in your cart</h2>
          <Link to="/products" className="btn btn-primary mt-8 px-8">Browse products</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <PageHeader crumb="checkout" title="Place your order" subtitle="Just a few details and your new pieces are on their way." />
      <div className='align-element py-16'>
        <div className='grid gap-8 lg:grid-cols-12'>
          <div className='lg:col-span-7'>
            <Form method='POST' className='flex flex-col gap-y-4 rounded-3xl border border-base-300 bg-base-100 p-6 sm:p-8'>
              <h4 className="font-display text-xl font-semibold">Shipping information</h4>
              <FormInput type="text" text="Full name" name="name" placeholder="Jane Doe" />
              <FormInput type="text" text="Address" name="address" placeholder="Street, city, postcode" />
              <div className="mt-4">
                <button type="submit" className="btn btn-primary btn-block">place your order</button>
              </div>
            </Form>
          </div>

          <div className="lg:col-span-5">
            <CartTotals />
          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout
