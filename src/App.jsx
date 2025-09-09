import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { About, Cart, Checkout, Error, HomeLayout, Landing, Login, Orders, PageFallback, Products, Register, SingleProduct } from './pages';
import { loader as LandingLoader } from './pages/Landing';
import { loader as ProductsLoader } from './pages/Products'
import { loader as SingleProductLoader } from './pages/SingleProduct';
import { loader as CheckoutLoader } from './pages/Checkout';
import { loader as OrdersLoader } from './pages/Orders'

import { action as RegisterAction } from './pages/Register';
import { action as LoginAction } from './pages/Login';
import { action as CheckoutAction } from './pages/Checkout';
import { store } from './store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5
    }
  }
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    hydrateFallbackElement: <PageFallback />,
    children: [
      {
        element: <Landing />,
        index: true,
        loader: LandingLoader(queryClient)
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'products',
        element: <Products />,
        loader: ProductsLoader(queryClient)
      },
      {
        path: 'products/:id',
        element: <SingleProduct />,
        loader: SingleProductLoader(queryClient)
      },
      {
        path: 'cart',
        element: <Cart />
      },
      {
        path: 'checkout',
        element: <Checkout />,
        loader: CheckoutLoader(store),
        action: CheckoutAction(store)
      },
      {
        path: 'orders',
        element: <Orders />,
        loader: OrdersLoader(store)
      },
    ]
  },
  {
    path: 'login',
    element: <Login />,
    action: LoginAction(store)
  },
  {
    path: 'register',
    element: <Register />,
    action: RegisterAction
  }
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App