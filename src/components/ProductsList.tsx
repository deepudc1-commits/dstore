import React from 'react'
import { Link } from 'react-router-dom'
import { HiArrowRight } from 'react-icons/hi2'
import { formatPrice } from '../utils';
import { Product } from '../types';

type ProductsListProps = {
  products: Product[]
}

const ProductsList = ({ products }: ProductsListProps) => {
  console.log(products);
  return (
    <div>
      <div className='mt-12 grid gap-y-6'>
        {products.map((product) => {
          const { title, company, image, price } = product.attributes
          return (
            <Link key={product.id} className="group flex flex-col gap-6 rounded-3xl bg-base-100 p-5 shadow-sm ring-1 ring-base-300/60 transition duration-300 hover:shadow-xl sm:flex-row sm:items-center" to={`/products/${product.id}`}>
              <div className="overflow-hidden rounded-2xl">
                <img loading="lazy" decoding="async" src={image} alt={title} className="h-40 w-full object-cover transition duration-500 group-hover:scale-110 sm:h-32 sm:w-44" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-base-content/50">{company}</p>
                <h3 className="mt-1 font-display text-xl font-semibold capitalize">{title}</h3>
              </div>
              <div className="flex items-center gap-6 sm:pr-4">
                <p className="text-lg font-semibold text-primary">{formatPrice(price)}</p>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-base-200 transition group-hover:bg-primary group-hover:text-primary-content"><HiArrowRight /></span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default ProductsList
