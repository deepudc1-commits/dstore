import React from 'react'
import { useSelector } from 'react-redux'
import { formatPrice } from '../utils';
import CartItem from '../components/CartItem';
import { Link } from 'react-router-dom';

const Cart = () => {
  const user= useSelector(state => state.userState.user) 
  const {cartItems, cartTotal, shipping, tax, grandTotal} = useSelector((state) => state.cart )
  console.log(cartItems);

  if(cartTotal === 0) {
    return (
      <div className="border-b border-base-300 pb-5">
        <h2 className="text-3xl font-medium tracking-wider capitalize">Your shopping cart is empty!</h2>
      </div>
    )
  }

  return (
    <>
      <div className="border-b border-base-300 pb-5">
        <h2 className="text-3xl font-medium tracking-wider capitalize">Shopping Cart</h2>
      </div>
      <div className='mt-8 grid gap-8 lg:grid-cols-12'>
        <div className='lg:col-span-8'>
          <CartItem cartItems={cartItems} />
        </div>

        <div className="lg:col-span-4 lg:pl-4">
          <div className="card bg-base-200">
            <div className="card-body">
              <p className="flex justify-between text-xs border-b border-base-300 pb-2"><span>Subtotal</span><span className="font-medium">{formatPrice(cartTotal)}</span></p>
              <p className="flex justify-between text-xs border-b border-base-300 pb-2"><span>Shipping</span><span className="font-medium">{formatPrice(shipping)}</span></p>
              <p className="flex justify-between text-xs border-b border-base-300 pb-2"><span>Tax</span><span className="font-medium">{formatPrice(tax)}</span></p>
              <p className="flex justify-between text-sm mt-4 pb-2"><span>Order Total</span><span className="font-medium">{formatPrice(grandTotal)}</span></p>
            </div>
          </div>
          {
            user ? <Link className="btn btn-primary btn-block mt-8" to="/checkout">Go to checkout</Link> : <Link className="btn btn-primary btn-block mt-8" to="/login">please login</Link>
          }
          
        </div>
      </div>
    </>
  )
}

export default Cart