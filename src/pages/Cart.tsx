import React from 'react'
import { useSelector } from 'react-redux'
import { HiArrowRight, HiOutlineShoppingBag } from 'react-icons/hi2'
import CartItem from '../components/CartItem';
import CartTotals from '../components/CartTotals';
import PageHeader from '../components/PageHeader';
import { Link } from 'react-router-dom';
import { RootState } from '../store';

const Cart = () => {
  const user= useSelector((state: RootState) => state.userState.user)
  const {cartItems, cartTotal, itemsInCart} = useSelector((state: RootState) => state.cart )
  console.log(cartItems);

  if(cartTotal === 0) {
    return (
      <div className="align-element py-24">
        <div className="mx-auto max-w-lg rounded-[2rem] border border-dashed border-base-300 px-8 py-16 text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-base-200 text-primary"><HiOutlineShoppingBag className="h-8 w-8" /></span>
          <h2 className="mt-6 font-display text-3xl font-semibold">Your shopping cart is empty!</h2>
          <p className="mt-3 text-base-content/60">Looks like you haven&apos;t added anything yet.</p>
          <Link to="/products" className="btn btn-primary mt-8 px-8">Start shopping <HiArrowRight /></Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <PageHeader crumb="cart" title="Shopping Cart" subtitle={`${itemsInCart} ${itemsInCart === 1 ? 'item' : 'items'} in your cart`} />
      <div className='align-element py-16'>
        <div className='grid gap-8 lg:grid-cols-12'>
          <div className='lg:col-span-8'>
            <CartItem cartItems={cartItems} />
          </div>

          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <CartTotals />
              {
                user ? <Link className="btn btn-primary btn-block mt-6" to="/checkout">Go to checkout <HiArrowRight /></Link> : <Link className="btn btn-primary btn-block mt-6" to="/login">please login</Link>
              }
              <Link className="btn btn-ghost btn-block mt-2" to="/products">Continue shopping</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart
