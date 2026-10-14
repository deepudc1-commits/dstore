import React from 'react'
import { Form, Link } from 'react-router-dom'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import FormInput from './FormInput'
import SelectInput from './SelectInput'
import RangeInput from './RangeInput'
import CheckboxInput from './CheckboxInput'
import { useProductsData } from '../queries'

const Filters = () => {
  const {meta, params} = useProductsData();
  const {search, category, company, price, shipping, order} = params;

  return (
    <>
    <Form key={JSON.stringify(params)} className='grid items-end gap-x-6 gap-y-6 rounded-3xl border border-base-300 bg-base-200/70 p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-4'>
      <FormInput name="search" type="search" text="Search" size="input-sm h-11" placeholder="Search products" defaultValue={search} />

      <SelectInput name="category" text="Category" size="select-sm h-11" list={meta.categories} defaultValue={category} />
      <SelectInput name="company" text="Company" size="select-sm h-11" list={meta.companies} defaultValue={company} />
      <SelectInput name="order" text="Sort by" size="select-sm h-11" list={['a-z', 'z-a', 'high', 'low']} defaultValue={order} />

      <RangeInput name="price" text="Price" price={price} />
      <CheckboxInput name="shipping" text="Free shipping" size="checkbox-sm" defaultChecked={Boolean(shipping)} />

      <button type="submit" className="btn btn-primary h-11 min-h-0 gap-2"><HiMagnifyingGlass /> Search</button>
      <Link to="/products" className='btn btn-outline h-11 min-h-0 border-base-300 bg-base-100 hover:border-neutral hover:bg-neutral'>Reset</Link>
    </Form>
    </>
  )
}

export default Filters
