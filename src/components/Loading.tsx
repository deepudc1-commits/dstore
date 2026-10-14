import React from 'react'

const Loading = () => {
  return (
    <div className='flex min-h-[60vh] flex-col items-center justify-center gap-4'>
        <span className='loading loading-ring loading-lg text-primary'></span>
        <p className='text-sm text-base-content/60'>Loading...</p>
    </div>
  )
}

export default Loading
