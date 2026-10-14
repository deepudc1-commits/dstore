import { useQuery } from '@tanstack/react-query'
import { useLoaderData } from 'react-router-dom'
import { customFetch } from './utils'
import { OrdersResponse, ProductsLoaderData, ProductsParams, ProductsResponse, SingleProductResponse, User } from './types'

export const featuredProductsQuery = {
  queryKey: ['featuredProducts'],
  queryFn: async () => {
    const response = await customFetch<ProductsResponse>('/products?featured=true')
    return response.data.data
  }
}

export const productsQuery = (params: ProductsParams) => {
  const {search, category, company, sort, price, shipping, page} = params
  return {
    queryKey: ['allProducts', search ?? '', category ?? 'all', company ?? 'all', sort ?? 'a-z', price ?? 100000, shipping ?? false, page ?? 1],
    queryFn: async () => {
      const response = await customFetch<ProductsResponse>('/products', {params: params})
      return { products: response.data.data, meta: response.data.meta }
    }
  }
}

export const useProductsData = () => {
  const loaderData = useLoaderData<ProductsLoaderData>()
  const { data = loaderData } = useQuery(productsQuery(loaderData.params))
  return { products: data.products, meta: data.meta, params: loaderData.params }
}

export const singleProductQuery = (id: string | undefined) => {
  return {
    queryKey: ['singleProduct', id],
    queryFn: async () => {
      const response = await customFetch<SingleProductResponse>(`/products/${id}`)
      return response.data.data
    }
  }
}

export const ordersQuery = (user: User | null) => {
  return {
    queryKey: ['orders', user?.id],
    queryFn: async () => {
      const response = await customFetch<OrdersResponse>('/orders', {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      })
      return { orders: response.data.data, meta: response.data.meta }
    }
  }
}
