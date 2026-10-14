import React, { useState } from 'react'
import ProductsGrid from './ProductsGrid'
import ProductsList from './ProductsList'
import { BsFillGridFill, BsList } from "react-icons/bs";
import { useProductsData } from '../queries';

const ProductsContainer = () => {
  const [gridView, SetGridView] = useState(true);
  const {products, meta} = useProductsData();

  if(products.length === 0) {
    return (
      <div className='mt-12 rounded-3xl border border-dashed border-base-300 px-6 py-20 text-center'>
        <h2 className='font-display text-2xl font-semibold'>There are no products left!</h2>
        <p className='mt-2 text-base-content/60'>Try changing or resetting the filters above.</p>
      </div>
    )
  }

  return (
    <>
      <div className='flex justify-between items-center mt-12 border-b border-base-300 pb-5'>
        <h4 className="text-sm text-base-content/70"><span className="font-semibold text-base-content">{meta.pagination.total}</span> products</h4>
        <div className='flex gap-x-1 rounded-full bg-base-200 p-1'>
          <button aria-label="List view" className={`text-lg btn btn-circle btn-sm border-0 ${!gridView ? 'btn-neutral' : 'btn-ghost' }`} onClick={() => SetGridView(false)}><BsList /></button>
          <button aria-label="Grid view" className={`text-base btn btn-circle btn-sm border-0 ${gridView ? 'btn-neutral' : 'btn-ghost' }`} onClick={() => SetGridView(true)}><BsFillGridFill /></button>
        </div>
      </div>
      {
        gridView ? <ProductsGrid products={products} /> : <ProductsList products={products} />
      }
    </>
  )
}

export default ProductsContainer
