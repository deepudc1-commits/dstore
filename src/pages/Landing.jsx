import React from 'react'
import { customFetch } from '../utils/index'
import FeaturedProducts from '../components/FeaturedProducts';
import { Link } from 'react-router-dom';
import bannerBgImg  from '../assets/banner-bg.jpg'
import heroImg1  from '../assets/slide1.jpg'
import heroImg2  from '../assets/slide2.jpg'
import heroImg3  from '../assets/slide3.jpg'
import catImg1  from '../assets/bed-icn.png'
import catImg2  from '../assets/chair-icn.png'
import catImg3  from '../assets/table-icn.png'
import catImg4  from '../assets/sofa-icn.png'
import catImg5  from '../assets/kids-icn.png'
import centreImg1  from '../assets/center-img1.jpg'
import centreImg2  from '../assets/center-img2.jpg'
import companyImg1  from '../assets/company-img1.jpg'
import companyImg2  from '../assets/company-img2.jpg'
import companyImg3  from '../assets/company-img3.jpg'
import companyImg4  from '../assets/company-img4.jpg'
import { FaRegArrowAltCircleRight } from "react-icons/fa";
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
    <div class="relative w-full">
      <div className='bg-no-repeat bg-center' style={{backgroundImage: `url(${bannerBgImg})`}}>
        <div class="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative grid lg:grid-cols-2 gap-24 items-center p-20 ">
          <div>
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl text-white">A touch of finesse transforming your home</h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-white">
            At D store, we are more than equipped to help you find anything and everything you require to create a home that is a dream to live in.
            </p>
            <div className="mt-10">
              <Link className="btn btn-primary" to="/products">Our Products</Link>
            </div>
          </div>
          <CarouselContainer image1={heroImg1} image2={heroImg2} image3={heroImg3} />
        </div>
      </div>
    </div>

    <div className='px-20 py-10'>
      <h2 class="text-3xl font-medium tracking-wider mb-10">Shop by category</h2>
      <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2'>
        <li>
          <Link to={'/products?search=&category=Beds'} className='flex flex-col items-center group'>
            <img src={catImg1} className='transition duration-300 ease-out hover:-translate-y-4 mb-2' />
            <p className='font-semibold transition duration-300 ease-out group-hover:text-blue-500'>Beds</p>
          </Link>
        </li>
        <li>
          <Link to={'/products?search=&category=Chairs'} className='flex flex-col items-center group'>
            <img src={catImg2} className='transition duration-300 ease-out hover:-translate-y-4 mb-2' />
            <p className='font-semibold transition duration-300 ease-out group-hover:text-blue-500'>Chairs</p>
          </Link>
        </li>
        <li>
          <Link to={'/products?search=&category=Tables'} className='flex flex-col items-center group'>
            <img src={catImg3} className='transition duration-300 ease-out hover:-translate-y-4 mb-2' />
            <p className='font-semibold transition duration-300 ease-out group-hover:text-blue-500'>Tables</p>
          </Link>
        </li>
        <li>
          <Link to={'/products?search=&category=Sofas'} className='flex flex-col items-center group'>
            <img src={catImg4} className='transition duration-300 ease-out hover:-translate-y-4 mb-2' />
            <p className='font-semibold transition duration-300 ease-out group-hover:text-blue-500'>Sofas</p>
          </Link>
        </li>
        <li>
          <Link to={'/products?search=&category=Kids'} className='flex flex-col items-center group'>
            <img src={catImg5} className='transition duration-300 ease-out hover:-translate-y-4 mb-2' />
            <p className='font-semibold transition duration-300 ease-out group-hover:text-blue-500'>Kids</p>
          </Link>
        </li>
      </ul>
    </div>

    <div className='px-20 py-10'>
      <h2 class="text-3xl font-medium tracking-wider mb-10">Our offers</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
        <Link>
          <div className='relative group'>
            <div className='relative overflow-hidden rounded'>
              <img src={centreImg1} className='transition duration-300 ease-out group-hover:scale-110 group-hover:translate-x-4' />
            </div>
            <div className='absolute bottom-12 left-6'>
              <h4 className='font-semibold text-2xl mb-2'>Make your home a masterpiece</h4>
              <p>Discover unique finds!</p>
            </div>
          </div>
        </Link>

        <Link>
          <div className='relative group'>
            <div className='relative overflow-hidden rounded'>
              <img src={centreImg2} className='transition duration-300 ease-out group-hover:scale-110 group-hover:translate-x-4' />
            </div>
            <div className='absolute bottom-12 left-6'>
              <h4 className='font-semibold text-2xl mb-2'>Make your home a masterpiece</h4>
              <p>Discover unique finds!</p>
            </div>
          </div>
        </Link>

        <Link>
          <div className='relative group'>
            <div className='relative overflow-hidden rounded'>
              <img src={centreImg1} className='transition duration-300 ease-out group-hover:scale-110 group-hover:translate-x-4' />
            </div>
            <div className='absolute bottom-12 left-6'>
              <h4 className='font-semibold text-2xl mb-2'>Make your home a masterpiece</h4>
              <p>Discover unique finds!</p>
            </div>
          </div>
        </Link>
      </div>
    </div>

    <div className='bg-gray-200 p-20'>
      <FeaturedProducts />
    </div>

    <div className='px-20 py-10'>
      <h2 class="text-3xl font-medium tracking-wider mb-10">Choose from brands</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        <Link to={'/products?company=Artifex'}>
          <div className='relative group'>
            <div className='relative overflow-hidden rounded'>
              <img src={companyImg1} className='transition duration-300 ease-out group-hover:scale-110' />
            </div>
            <div className='absolute top-12 left-6'>
              <h4 className='text-white font-semibold text-2xl mb-2'>Artifex <FaRegArrowAltCircleRight className='inline-block' /></h4>
            </div>
          </div>
        </Link>
        <Link to={'/products?company=Luxora'}>
          <div className='relative group'>
            <div className='relative overflow-hidden rounded'>
              <img src={companyImg2} className='transition duration-300 ease-out group-hover:scale-110' />
            </div>
            <div className='absolute top-12 left-6'>
              <h4 className='font-semibold text-2xl mb-2'>Luxora <FaRegArrowAltCircleRight className='inline-block' /></h4>
            </div>
          </div>
        </Link>
        <Link to={'/products?company=Comfora'}>
          <div className='relative group'>
            <div className='relative overflow-hidden rounded'>
              <img src={companyImg3} className='transition duration-300 ease-out group-hover:scale-110' />
            </div>
            <div className='absolute top-12 left-6'>
              <h4 className='text-white font-semibold text-2xl mb-2'>Comfora <FaRegArrowAltCircleRight className='inline-block' /></h4>
            </div>
          </div>
        </Link>
        <Link to={'/products?company=Modenza'}>
          <div className='relative group'>
            <div className='relative overflow-hidden rounded'>
              <img src={companyImg4} className='transition duration-300 ease-out group-hover:scale-110' />
            </div>
            <div className='absolute top-12 left-6'>
              <h4 className='text-white font-semibold text-2xl mb-2'>Modenza <FaRegArrowAltCircleRight className='inline-block' /></h4>
            </div>
          </div>
        </Link>
      </div>
    </div>

    
    </>
  )
}

export default Landing