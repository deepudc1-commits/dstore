import React from 'react'
import { customFetch } from '../utils'
import { useLoaderData } from 'react-router-dom';

export const loader = (store) => async() => {
  const {token} = store.getState().userState.user
  const response = await customFetch('/orders', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const orders = response.data.data
  const meta = response.data.meta
  return {orders, meta}
}

const Orders = () => {
  const {orders, meta} = useLoaderData()
  const {pagination} = meta
  
  if(pagination.total < 1) {
    return (
      <>
        <div className="border-b border-base-300 pb-5">
          <h2 className="text-3xl font-medium tracking-wider capitalize">Your Orders</h2>
        </div>
        <div className="mt-8">
          <h4 className="mb-4 capitalize">You have not made any orders yet!</h4>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="border-b border-base-300 pb-5">
        <h2 className="text-3xl font-medium tracking-wider capitalize">Your Orders</h2>
      </div>
      <div className="mt-8">
        <h4 className="mb-4 capitalize">total orders : {pagination.total}</h4>
        <div className="overflow-x-auto">
          <table className='table table-zebra'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Products</th>
                <th>Cost</th>
                <th className="hidden sm:block">Date</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => {
                const {name, address, numItemsInCart, orderTotal, updatedAt} = order.attributes
                return (
                  <tr key={order.id}>
                    <td>{name}</td>
                    <td>{address}</td>
                    <td>{numItemsInCart}</td>
                    <td>{orderTotal}</td>
                    <td className="hidden sm:block">{updatedAt}</td>
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
