import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type AuthLayoutProps = {
  image: string
  quote: string
  children: ReactNode
}

const AuthLayout = ({ image, quote, children }: AuthLayoutProps) => {
  return (
    <section className='grid min-h-screen lg:grid-cols-2'>
      <div className='relative hidden lg:block'>
        <img src={image} alt="" className='absolute inset-0 h-full w-full object-cover' />
        <div className='absolute inset-0 bg-gradient-to-t from-neutral/80 via-neutral/10 to-neutral/60'></div>
        <Link to="/" className="absolute left-10 top-10 font-display text-3xl font-bold text-white">
          D<span className="text-accent">Store</span>
        </Link>
        <p className='absolute bottom-12 left-10 right-10 max-w-md font-display text-3xl font-semibold leading-snug text-white'>{quote}</p>
      </div>
      <div className='flex items-center justify-center bg-base-200 px-6 py-16 lg:bg-base-100'>
        <div className='w-full max-w-md'>
          <Link to="/" className="mb-10 block text-center font-display text-3xl font-bold lg:hidden">
            D<span className="text-primary">Store</span>
          </Link>
          {children}
        </div>
      </div>
    </section>
  )
}

export default AuthLayout
