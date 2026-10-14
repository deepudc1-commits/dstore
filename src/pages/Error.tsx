import React from 'react'
import { useRouteError, Link } from 'react-router-dom'

const Error = () => {
  const error = useRouteError() as { status?: number };
  console.log(error);

  if(error.status === 404) {
    return (
      <main className="grid min-h-[100vh] place-items-center bg-base-200 px-8">
        <div className="text-center">
          <p className="font-display text-[8rem] font-bold leading-none text-primary sm:text-[12rem]">404</p>
          <h1 className="mt-4 font-display text-3xl font-semibold capitalize tracking-tight sm:text-5xl">page not found</h1>
          <p className="mt-6 text-lg leading-7 text-base-content/70">Sorry, we couldn’t find the page you’re looking for.</p>
          <div className="mt-10 flex justify-center gap-3">
            <Link className="btn btn-primary px-8" to="/">go back home</Link>
            <Link className="btn btn-ghost" to="/products">Browse products</Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="grid min-h-[100vh] place-items-center bg-base-200 px-8">
      <div className="text-center">
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">There was some error!</h1>
        <p className="mt-4 text-base-content/70">Please try again in a moment.</p>
        <Link className="btn btn-primary mt-8 px-8" to="/">go back home</Link>
      </div>
    </main>
  )
}

export default Error
