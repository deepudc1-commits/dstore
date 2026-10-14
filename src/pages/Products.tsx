import React from 'react'
import Filters from '../components/Filters'
import PaginationContainer from '../components/PaginationContainer'
import ProductsContainer from '../components/ProductsContainer'
import PageHeader from '../components/PageHeader'
import { QueryClient } from '@tanstack/react-query'
import { LoaderFunctionArgs } from 'react-router-dom'
import { ProductsLoaderData } from '../types'
import { productsQuery } from '../queries'

export const loader = (queryClient: QueryClient) => async({request}: LoaderFunctionArgs): Promise<ProductsLoaderData> => {
  const tempParams = new URL(request.url).searchParams.entries();
  console.log(tempParams);
  
  const params = Object.fromEntries([...tempParams]);
  
  const { products, meta } = await queryClient.ensureQueryData(productsQuery(params));
  return { products, meta, params }
}

const Products = () => {
  return (
    <>
      <PageHeader crumb="products" eyebrow="The collection" title="All products" subtitle="Furniture and decor for every room, from statement sofas to the little things that make a house a home." />
      <div className='align-element py-16'>
        <Filters />
        <ProductsContainer />
        <PaginationContainer />
      </div>
    </>
  )
}

export default Products