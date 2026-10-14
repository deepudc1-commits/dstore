import React, { ChangeEvent, useState } from 'react'
import { formatPrice } from '../utils';
import { Link, LoaderFunctionArgs, useLoaderData, useParams } from 'react-router-dom';
import { HiOutlineArrowPath, HiOutlineShoppingBag, HiOutlineTruck } from 'react-icons/hi2';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { CartItem, SingleProductLoaderData } from '../types';
import { singleProductQuery } from '../queries';
import { useDispatch } from 'react-redux';
import { addtoCart, clearCart } from '../features/cart/cartSlice';

export const loader = (queryClient: QueryClient) => async({params}: LoaderFunctionArgs): Promise<SingleProductLoaderData> => {
  const product = await queryClient.ensureQueryData(singleProductQuery(params.id))
  return { product }
}

const SingleProduct = () => {
  const { id } = useParams()
  const loaderData = useLoaderData<SingleProductLoaderData>();
  const { data: product = loaderData.product } = useQuery(singleProductQuery(id))
  console.log(product);

  const dispatch = useDispatch()

  const { title, image, company, description, price, colors } = product.attributes

  const [productColor, setProductColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setAmount(parseInt(e.target.value));
  }

  const cartProduct: CartItem = {
    cartID: product.id + productColor,
    productID: product.id,
    amount,
    title,
    image,
    company,
    price,
    productColor
  }

  return (
    <section className='align-element py-12 lg:py-16'>
      <div className="breadcrumbs text-sm text-base-content/60">
        <ul>
          <li><Link to="/" className="hover:text-primary">Home</Link></li>
          <li><Link to="/products" className="hover:text-primary">Products</Link></li>
          <li className="capitalize text-base-content">{title}</li>
        </ul>
      </div>
      <div className='mt-6 grid gap-y-10 lg:grid-cols-2 lg:gap-x-16'>
        <div className='overflow-hidden rounded-[2rem] bg-base-200'>
          <img src={image} alt={title} className='aspect-square w-full object-cover lg:aspect-[4/5]' />
        </div>
        <div className="lg:py-6">
          <p className="eyebrow">{company}</p>
          <h1 className="mt-3 font-display text-4xl font-semibold capitalize tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-5 text-3xl font-semibold text-primary">{formatPrice(price)}</p>
          <p className="mt-6 leading-8 text-base-content/70">{description}</p>

          <div className="mt-8 border-t border-base-300 pt-8">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-base-content/60">colors</h4>
            <div className="mt-3 flex flex-wrap gap-3">
              {colors.map((color) => {
                return <button key={color} type="button" aria-label={color} onClick={() => setProductColor(color)} className={`h-9 w-9 rounded-full ring-offset-2 ring-offset-base-100 transition ${color === productColor ? 'ring-2 ring-neutral scale-110' : 'ring-1 ring-base-300 hover:scale-110'}`} style={{background: color}}></button>
              })}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-end gap-4">
            <div className="form-control w-32">
              <label className="label pt-0" htmlFor="amount">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-base-content/60">amount</h4>
              </label>
              <select className="select select-bordered rounded-xl border-base-300 focus:border-primary focus:outline-none" value={amount} onChange={handleChange} id="amount">
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>
            <button className='btn btn-primary flex-1 gap-2 px-10 sm:flex-none' onClick={() => dispatch( addtoCart({product: cartProduct}) )}><HiOutlineShoppingBag className="h-5 w-5" /> Add to cart</button>
          </div>

          <ul className="mt-10 grid gap-4 rounded-3xl bg-base-200 p-6 text-sm sm:grid-cols-2">
            <li className="flex items-center gap-3"><HiOutlineTruck className="h-5 w-5 text-primary" /> Free delivery over $500</li>
            <li className="flex items-center gap-3"><HiOutlineArrowPath className="h-5 w-5 text-primary" /> 30-day easy returns</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default SingleProduct
