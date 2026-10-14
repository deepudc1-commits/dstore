import React from 'react'
import { HiOutlineTrash } from 'react-icons/hi2'
import { formatPrice } from '../utils';
import { useDispatch } from 'react-redux';
import { deleteCartItem, editCartItem } from '../features/cart/cartSlice';
import { CartItem as CartItemType } from '../types';

type CartItemProps = {
  cartItems: CartItemType[]
}

const CartItem = ({cartItems}: CartItemProps) => {
  const dispatch = useDispatch();

  return (
    <div className="divide-y divide-base-300 rounded-3xl border border-base-300 bg-base-100 px-6">
        {
        cartItems.map((item) => {
            const {cartID, amount, title, image, company, price, productColor} = item;
            return (
              <article key={cartID} className="flex flex-col gap-6 py-6 sm:flex-row sm:items-center">
                <img src={image} alt={title} className="h-28 w-28 shrink-0 rounded-2xl object-cover" />
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-widest text-base-content/50">{company}</p>
                  <h3 className="mt-1 font-display text-lg font-semibold capitalize">{title}</h3>
                  <p className="mt-3 flex items-center gap-x-2 text-sm text-base-content/70">Color<span className="h-4 w-4 rounded-full ring-1 ring-base-300" style={ {backgroundColor: productColor} }></span></p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="form-control">
                    <label htmlFor="amount" className="sr-only">Amount</label>
                    <select name="amount" id="amount" value={amount} onChange={ (e) => dispatch(editCartItem({id:cartID, newCount:e.target.value})) } className="select select-bordered select-sm rounded-xl border-base-300">
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                    </select>
                  </div>
                  <button onClick={() => dispatch(deleteCartItem({id: cartID}))} aria-label="remove" className="btn btn-ghost btn-circle btn-sm text-base-content/60 hover:bg-error/10 hover:text-error"><HiOutlineTrash className="h-5 w-5" /></button>
                </div>
                <p className="w-24 font-semibold sm:text-right">{formatPrice(price)}</p>
              </article>
            )
        })}
    </div>
  )
}

export default CartItem
