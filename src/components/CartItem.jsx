import React from 'react'
import { formatPrice } from '../utils';
import { useDispatch } from 'react-redux';
import { deleteCartItem, editCartItem } from '../features/cart/cartSlice';

const CartItem = ({cartItems}) => {
  const dispatch = useDispatch();

  return (
    <>
        {
        cartItems.map((item) => {          
            const {cartID, amount, title, image, company, price, productColor} = item;            
            return (
              <article key={cartID} className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0">
                <img src={image} alt={title} className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover" />
                <div className="sm:ml-16 sm:w-48">
                  <h3 className="capitalize font-medium">{title}</h3>
                  <h4 className="mt-2 capitalize text-sm text-neutral-content">{company}</h4>
                  <p className="mt-4 text-sm capitalize flex items-center gap-x-2">color :<span className="badge badge-sm" style={ {backgroundColor: productColor} }></span></p>
                </div>
                <div className="sm:ml-12">
                  <div className="form-control max-w-xs">
                    <label htmlFor="amount" className="label p-0">
                      <span className="label-text">Amount</span>
                    </label>
                    <select name="amount" id="amount" value={amount} onChange={ (e) => dispatch(editCartItem({id:cartID, newCount:e.target.value})) } className="mt-2 select select-base select-bordered select-xs">
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                    </select>
                  </div>
                  <button onClick={() => dispatch(deleteCartItem({id: cartID}))} className="mt-2 link link-primary link-hover text-sm">remove</button>
                </div>
                <p className="font-medium sm:ml-auto">{formatPrice(price)}</p>
              </article>
            )
        })}
    </>
  )
}

export default CartItem
