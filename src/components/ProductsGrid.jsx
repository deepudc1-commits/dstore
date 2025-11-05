import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { formatPrice } from '../utils';

const ProductsGrid = () => {
  const {products} = useLoaderData();

  return (
    <>
    <div className='pt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
      {products.map((product) => {
        const {title, price, image} = product.attributes;
        return (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className='card bg-white w-full shadow-xl group hover:shadow-2xl transition duration-300'
          >
            <div className='px-4 pt-4'>
              <figure className='overflow-hidden'>
                <img
                  src={image}
                  alt={title}
                  className='rounded-xl h-64 md:h-48 w-full object-cover transform transition duration-300 ease-in-out group-hover:scale-125'
                />
              </figure>
            </div>
            <div className='card-body items-center text-center'>
              <h2 className='card-title capitalize tracking-wider'>{title}</h2>
              <span className='text-secondary'>{formatPrice(price)}</span>
            </div>
          </Link>
        )
      })}
    </div>
    </>
  )
}

export default ProductsGrid