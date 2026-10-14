import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'
import { useProductsData } from '../queries'

const PaginationContainer = () => {
  const {meta} = useProductsData()
  console.log(meta);
  const {page, pageCount} = meta.pagination

  //Creating an Array to be used as numbered pagination buttons
  const pages = Array.from({length: pageCount}, (_, index) => {
    return index + 1
  })

  const {search, pathname} = useLocation()
  const navigate = useNavigate()

  const handleChange = (pageNum: number) => {
    const searchParams = new URLSearchParams(search)
    console.log(searchParams);
    //Adding a query parameter named page in the URL for page number
    searchParams.set('page', String(pageNum))
    console.log(searchParams);
    navigate(`${pathname}?${searchParams.toString()}`)
  }

  if(pageCount < 1) {
    return null
  }

  return (
    <>
      <div className='mt-16 flex justify-center'>
        <div className="flex items-center gap-2">
          <button className="btn btn-sm sm:btn-md btn-ghost gap-1" onClick={() =>{
            let count = page - 1
            if(count < 1) count = pageCount
            handleChange(count)}}><HiChevronLeft /> Prev</button>
          {
            pages.map((p) => {
              return <button key={p} className={`btn btn-circle btn-sm sm:btn-md ${(p === page)? 'btn-neutral': 'btn-ghost'}`} onClick={() => handleChange(p)}>{p}</button>
            })
          }
          <button className="btn btn-sm sm:btn-md btn-ghost gap-1" onClick={() => {
            let count = page + 1
            if(count > pageCount) count = 1
            handleChange(count)}}>Next <HiChevronRight /></button>
        </div>
      </div>
    </>
  )
}

export default PaginationContainer
