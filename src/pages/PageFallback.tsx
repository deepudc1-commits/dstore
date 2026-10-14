import React from 'react'

const PageFallback = () => {
  return (
    <div className='flex h-screen flex-col items-center justify-center gap-4 bg-base-200'>
      <p className='font-display text-4xl font-bold tracking-tight'>D<span className='text-primary'>Store</span></p>
      <p className='flex items-center gap-3 text-sm text-base-content/60'><span className='loading loading-ring loading-md text-primary'></span> DStore is loading...</p>
    </div>
  )
}

export default PageFallback
