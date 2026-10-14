import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import HomeLayout from './pages/HomeLayout'
import Error from './pages/Error'
import PageFallback from './pages/PageFallback'
import { store } from './store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60
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
        index: true,
        lazy: async () => {
          const { default: Landing, loader } = await import('./pages/Landing')
          return { Component: Landing, loader: loader(queryClient) }
        }
      },
      {
        path: 'about',
        lazy: async () => {
          const { default: About } = await import('./pages/About')
          return { Component: About }
        }
      },
      {
        path: 'products',
        lazy: async () => {
          const { default: Products, loader } = await import('./pages/Products')
          return { Component: Products, loader: loader(queryClient) }
        }
      },
      {
        path: 'products/:id',
        lazy: async () => {
          const { default: SingleProduct, loader } = await import('./pages/SingleProduct')
          return { Component: SingleProduct, loader: loader(queryClient) }
        }
      },
      {
        path: 'cart',
        lazy: async () => {
          const { default: Cart } = await import('./pages/Cart')
          return { Component: Cart }
        }
      },
      {
        path: 'checkout',
        lazy: async () => {
          const { default: Checkout, loader, action } = await import('./pages/Checkout')
          return { Component: Checkout, loader: loader(store), action: action(store, queryClient) }
        }
      },
      {
        path: 'orders',
        lazy: async () => {
          const { default: Orders, loader } = await import('./pages/Orders')
          return { Component: Orders, loader: loader(store, queryClient) }
        }
      },
    ]
  },
  {
    path: 'login',
    hydrateFallbackElement: <PageFallback />,
    lazy: async () => {
      const { default: Login, action } = await import('./pages/Login')
      return { Component: Login, action: action(store) }
    }
  },
  {
    path: 'register',
    hydrateFallbackElement: <PageFallback />,
    lazy: async () => {
      const { default: Register, action } = await import('./pages/Register')
      return { Component: Register, action }
    }
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
