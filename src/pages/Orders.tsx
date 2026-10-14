import React from 'react'
import { Link, useLoaderData } from 'react-router-dom';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import PageHeader from '../components/PageHeader';
import { AppStore, RootState } from '../store';
import { OrdersLoaderData } from '../types';
import { ordersQuery } from '../queries';

export const loader = (store: AppStore, queryClient: QueryClient) => async(): Promise<OrdersLoaderData> => {
  const user = store.getState().userState.user!
  return queryClient.ensureQueryData(ordersQuery(user))
}

const Orders = () => {
  const loaderData = useLoaderData<OrdersLoaderData>()
  const user = useSelector((state: RootState) => state.userState.user)
  const { data: {orders, meta} = loaderData } = useQuery({ ...ordersQuery(user), enabled: Boolean(user) })
  const {pagination} = meta

  if(pagination.total < 1) {
    return (
      <>
        <PageHeader crumb="orders" title="Your Orders" />
        <div className='align-element py-16'>
          <div className="rounded-3xl border border-dashed border-base-300 px-8 py-16 text-center">
            <h4 className="font-display text-2xl font-semibold">You have not made any orders yet!</h4>
            <Link to="/products" className="btn btn-primary mt-8 px-8">Start shopping</Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <PageHeader crumb="orders" title="Your Orders" subtitle={`Total orders: ${pagination.total}`} />
      <div className='align-element py-16'>
        <div className="overflow-x-auto rounded-3xl border border-base-300 bg-base-100">
          <table className='table'>
            <thead className="bg-base-200 text-xs uppercase tracking-wider text-base-content/60">
              <tr>
                <th className="py-4">Name</th>
                <th>Address</th>
                <th>Products</th>
                <th>Cost</th>
                <th className="hidden sm:table-cell">Date</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => {
                const {name, address, numItemsInCart, orderTotal, updatedAt} = order.attributes
                return (
                  <tr key={order.id} className="hover:bg-base-200/60">
                    <td className="py-4 font-medium">{name}</td>
                    <td className="text-base-content/70">{address}</td>
                    <td><span className="badge badge-ghost">{numItemsInCart}</span></td>
                    <td className="font-semibold text-primary">{orderTotal}</td>
                    <td className="hidden text-base-content/70 sm:table-cell">{updatedAt}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Orders
