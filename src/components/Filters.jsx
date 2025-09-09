import React from 'react'
import { Form, Link, useLoaderData } from 'react-router-dom'
import FormInput from './FormInput'
import SelectInput from './SelectInput'
import RangeInput from './RangeInput'
import CheckboxInput from './CheckboxInput'

const Filters = () => {
  const {meta, params} = useLoaderData();
  const {search, category, company, price, shipping, order} = params;

  return (
    <>
    <Form className='bg-base-200 rounded-md px-8 py-4 grid gap-x-4  gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center'>
      <FormInput name="search" type="search" text="Search" size="input-sm" defaultValue={search} />

      <SelectInput name="category" text="Category" size="select-sm" list={meta.categories} defaultValue={category} />
      <SelectInput name="company" text="Company" size="select-sm" list={meta.companies} defaultValue={company} />
      <SelectInput name="order" text="Sort by" size="select-sm" list={['a-z', 'z-a', 'high', 'low']} defaultValue={order} />
      
      <RangeInput name="price" text="Price" price={price} />
      <CheckboxInput name="shipping" text="Free shipping" size="checkbox-sm" defaultChecked={shipping} />

      <button type="submit" className="btn btn-primary btn-sm">search</button>
      <Link to="/products" className='btn btn-accent btn-sm'>Reset</Link>
    </Form>
    </>
  )
}

export default Filters