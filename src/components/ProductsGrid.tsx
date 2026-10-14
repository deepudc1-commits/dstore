import React from 'react'
import { Link } from 'react-router-dom'
import { formatPrice } from '../utils';
import { Product } from '../types';

type ProductsGridProps = {
  products: Product[]
}

const ProductsGrid = ({ products }: ProductsGridProps) => {

  return (
    <>
    <div className='pt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
      {products.map((product) => {
        const {title, price, image, company} = product.attributes;
        return (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className='group flex flex-col overflow-hidden rounded-3xl bg-base-100 shadow-sm ring-1 ring-base-300/60 transition duration-300 hover:-translate-y-1 hover:shadow-2xl'
          >
            <figure className='relative overflow-hidden bg-base-200'>
              <img
                loading="lazy"
                decoding="async"
                src={image}
                alt={title}
                className='aspect-[4/3] w-full object-cover transition duration-700 ease-out group-hover:scale-110'
              />
              <span className='absolute right-4 top-4 rounded-full bg-base-100/90 px-3 py-1 text-xs font-semibold text-base-content/70 backdrop-blur'>{company}</span>
            </figure>
            <div className='flex flex-1 items-center justify-between gap-4 p-6'>
              <h2 className='font-display text-lg font-semibold capitalize leading-snug'>{title}</h2>
              <span className='shrink-0 font-semibold text-primary'>{formatPrice(price)}</span>
            </div>
          </Link>
        )
      })}
    </div>
    </>
  )
}

export default ProductsGrid
