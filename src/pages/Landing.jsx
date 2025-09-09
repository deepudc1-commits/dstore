import React from 'react'
import { customFetch } from '../utils/index'
import FeaturedProducts from '../components/FeaturedProducts';
import { Link } from 'react-router-dom';
import heroImg1  from '../assets/slide1.jpg'
import heroImg2  from '../assets/slide2.jpg'
import heroImg3  from '../assets/slide3.jpg'
import CarouselContainer from '../components/CarouselContainer';

// Omitting "useQuery" in featuredProductsQuery because useQuery is a hook and hooks can only be invoked
// in component body. That's how it is used in loaders.
const featuredProductsQuery = {
  queryKey: ['featuredProducts'],
  queryFn: () => customFetch('/products?featured=true')
}

export const loader = (queryClient) => async() => {
  const response = await queryClient.ensureQueryData(featuredProductsQuery)
  const products = response.data.data;
  return {products}
}

const Landing = () => {
  return (
    <>
    <div className="grid lg:grid-cols-2 gap-24 items-center">
      <div>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">A touch of finesse transforming your home</h1>
        <p className="mt-8 max-w-xl text-lg leading-8">
         At D store, we are more than equipped to help you find anything and everything you require to create a home that is a dream to live in.
        </p>
        <div className="mt-10">
          <Link className="btn btn-primary" to="/products">Our Products</Link>
        </div>
      </div>
      <CarouselContainer image1={heroImg1} image2={heroImg2} image3={heroImg3} />
    </div>
    <div className='pt-24'>
      <FeaturedProducts />
    </div>
    </>
  )
}

export default Landing