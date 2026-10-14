export type ProductAttributes = {
  title: string
  company: string
  description: string
  category: string
  image: string
  // The API sends prices as strings of cents
  price: string
  colors: string[]
  featured: boolean
  shipping: boolean
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export type Product = {
  id: number
  attributes: ProductAttributes
}

export type Pagination = {
  page: number
  pageCount: number
  pageSize: number
  total: number
}

export type ProductsMeta = {
  categories: string[]
  companies: string[]
  pagination: Pagination
}

export type ProductsResponse = {
  data: Product[]
  meta: ProductsMeta
}

export type SingleProductResponse = {
  data: Product
  meta: object
}

export type CartItem = {
  cartID: string
  productID: number
  amount: number
  title: string
  image: string
  company: string
  price: string
  productColor: string
}

export type OrderAttributes = {
  name: string
  address: string
  chargeTotal: number
  orderTotal: string
  numItemsInCart: number
  cartItems: CartItem[]
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export type Order = {
  id: number
  attributes: OrderAttributes
}

export type OrdersResponse = {
  data: Order[]
  meta: { pagination: Pagination }
}

export type StrapiUser = {
  id: number
  username: string
  email: string
  [key: string]: unknown
}

export type AuthResponse = {
  jwt: string
  user: StrapiUser
}

export type User = StrapiUser & { token: string }

export type ApiErrorBody = {
  error?: { message?: string }
}

// Route loader data

export type ProductsParams = {
  search?: string
  category?: string
  company?: string
  order?: string
  price?: string
  shipping?: string
  page?: string
  [key: string]: string | undefined
}

export type LandingLoaderData = {
  products: Product[]
}

export type ProductsLoaderData = {
  products: Product[]
  meta: ProductsMeta
  params: ProductsParams
}

export type SingleProductLoaderData = {
  product: Product
}

export type OrdersLoaderData = {
  orders: Order[]
  meta: OrdersResponse['meta']
}
