import React from 'react'
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'

const PaginationContainer = () => {
  const {meta} = useLoaderData()
  console.log(meta);
  const {page, pageCount} = meta.pagination

  //Creating an Array to be used as numbered pagination buttons
  const pages = Array.from({length: pageCount}, (_, index) => {
    return index + 1
  })

  const {search, pathname} = useLocation()
  const navigate = useNavigate()

  const handleChange = (pageNum) => {
    const searchParams = new URLSearchParams(search)
    console.log(searchParams);
    //Adding a query parameter named page in the URL for page number
    searchParams.set('page', pageNum)
    console.log(searchParams);
    navigate(`${pathname}?${searchParams.toString()}`)
  }

  if(pageCount < 1) {
    return null
  }

  return (
    <>
      <div className='mt-16 flex justify-end'>
        <div className="join">
          <button className="btn btn-xs sm:btn-md join-item" onClick={() =>{
            let count = page - 1
            if(count < 1) count = pageCount
            handleChange(count)}}>Prev</button>
          {
            pages.map((p) => {
              return <button key={p} className={`btn btn-xs sm:btn-md join-item ${(p === page)? 'bg-base-300 border-base-300': null}`} onClick={() => handleChange(p)}>{p}</button>
            })
          }
          <button className="btn btn-xs sm:btn-md join-item" onClick={() => {
            let count = page + 1
            if(count > pageCount) count = 1
            handleChange(count)}}>Next</button>
        </div>
      </div>
    </>
  )
}

export default PaginationContainer