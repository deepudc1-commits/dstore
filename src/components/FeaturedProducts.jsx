import React from 'react'
import ProductsGrid from './ProductsGrid'

const FeaturedProducts = () => {
  return (
    <>
        <div className="border-b border-base-300 pb-5">
            <h2 className="text-3xl font-medium tracking-wider capitalize">featured products</h2>
        </div>
        <ProductsGrid />
    </>
  )
}

export default FeaturedProducts