import React from 'react'
import { Filters, PaginationContainer, ProductsContainer } from '../components'
import { customFetch } from '../utils'

const productsQuery = (params) => {
  const {search, category, company, sort, price, shipping, page} = params
  return {
    queryKey: ['allProducts', search ?? '', category ?? 'all', company ?? 'all', sort ?? 'a-z', price ?? 100000, shipping ?? false, page ?? 1],
    queryFn: () => customFetch('/products', {params: params})
  }
}

export const loader = (queryClient) => async({request}) => {
  const tempParams = new URL(request.url).searchParams.entries();
  console.log(tempParams);
  
  const params = Object.fromEntries([...tempParams]);
  
  const response = await queryClient.ensureQueryData(productsQuery(params));
  
  const products = response.data.data;
  const meta = response.data.meta
  return { products, meta, params }
}

const Products = () => {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  )
}

export default Products