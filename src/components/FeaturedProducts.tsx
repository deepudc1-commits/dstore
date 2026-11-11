import { Link, useLoaderData } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { HiArrowRight } from 'react-icons/hi2'
import ProductsGrid from './ProductsGrid'
import { featuredProductsQuery } from '../queries'
import { LandingLoaderData } from '../types'

const FeaturedProducts = () => {
  const loaderData = useLoaderData<LandingLoaderData>()
  const { data: products = loaderData.products } = useQuery(featuredProductsQuery)

  if(!products || products.length === 0) {
    return <>
      <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
              <p className="eyebrow">Hand picked</p>
              <h2 className="section-title mt-2">Featured products</h2>
          </div>
      </div>
      <p className="mt-5 text-lg text-muted-foreground">No featured products available</p>
    </>
  }

  return (
    <>
        <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
                <p className="eyebrow">Hand picked</p>
                <h2 className="section-title mt-2">Featured products</h2>
            </div>
            <Link to="/products" className="btn btn-ghost btn-sm gap-2 text-primary">View all <HiArrowRight /></Link>
        </div>
        <ProductsGrid products={products} />
    </>
  )
}

export default FeaturedProducts
