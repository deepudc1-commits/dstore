import React, { useState } from 'react'
import ProductsGrid from './ProductsGrid'
import ProductsList from './ProductsList'
import { useLoaderData } from 'react-router-dom';
import { BsFillGridFill, BsList } from "react-icons/bs";

const ProductsContainer = () => {
  const [gridView, SetGridView] = useState(true);
  const {products, meta} = useLoaderData();

  if(products.length === 0) {
    return (
      <div className='flex justify-between items-center mt-8 border-b border-base-300 pb-5'>
        <h2>There are no products left!</h2>
      </div>
    )
  }

  return (
    <>
      <div className='flex justify-between items-center mt-8 border-b border-base-300 pb-5'>
        <h4 className="font-medium text-md">{`Products: ${meta.pagination.total}`}</h4>
        <div className='flex gap-x-2'>
          <button className={`text-xl btn btn-circle btn-sm ${!gridView ? 'btn-primary text-primary-content' : 'btn-ghost text-based-content' }`} onClick={() => SetGridView(false)}><BsList /></button>
          <button className={`text-xl btn btn-circle btn-sm ${gridView ? 'btn-primary text-primary-content' : 'btn-ghost text-based-content' }`} onClick={() => SetGridView(true)}><BsFillGridFill /></button>
        </div>
      </div>
      {
        gridView ? <ProductsGrid /> : <ProductsList />
      }
    </>
  )
}

export default ProductsContainer