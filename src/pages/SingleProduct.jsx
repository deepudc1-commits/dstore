import React, { useState } from 'react'
import { customFetch, formatPrice } from '../utils';
import { useLoaderData } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addtoCart, clearCart } from '../features/cart/cartSlice';

const singleProductQuery = (id) => {
  return {
    queryKey: ['singleProduct', id],
    queryFn: () => customFetch(`/products/${id}`)
  }
}

export const loader = (queryClient) => async({params}) => {
  const response = await queryClient.ensureQueryData(singleProductQuery(params.id))
  const product = response.data.data;
  return { product }
}

const SingleProduct = () => {
  const {product} = useLoaderData();
  console.log(product);

  const dispatch = useDispatch()

  const { title, image, company, description, price, colors } = product.attributes

  const [productColor, setProductColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  const handleChange = (e) => {
    setAmount(parseInt(e.target.value));
  }

  const cartProduct = {
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
    <section>
      <div className='mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16'>
        <img src={image} alt={title} className='w-96 h-96 object-cover rounded-lg lg:w-full' />
        <div>
          <h1 className="capitalize text-3xl font-bold">{title}</h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">{company}</h4>
          <p className="mt-3 text-xl">{formatPrice(price)}</p>
          <p className="mt-6 leading-8">{description}</p>

          <div className="mt-6">
            <h4 className="text-md font-medium tracking-wider capitalize">colors</h4>
            <div className="mt-2">
              {colors.map((color) => {
                return <button key={color} type="button" onClick={() => setProductColor(color)} className={`badge w-6 h-6 mr-2 ${color === productColor ? 'border-2 border-secondary' : null}`} style={{background: color}}></button>
              })}
            </div>
          </div>

          <div className="form-control w-full max-w-xs mt-2">
            <label className="label" htmlFor="amount">
              <h4 className="text-md font-medium -tracking-wider capitalize">amount</h4>
            </label>
            <select className="select select-secondary select-bordered select-md" value={amount} onChange={handleChange} id="amount">
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>

          <div className="mt-10">
            <button className='btn btn-primary btn-md uppercase' onClick={() => dispatch( addtoCart({product: cartProduct}) )}>Add to cart</button>
          </div>
        </div>
        
      </div>
    </section>
  )
}

export default SingleProduct