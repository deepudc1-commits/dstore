import React from 'react'
import FeaturedProducts from '../components/FeaturedProducts';
import { Link } from 'react-router-dom';
import bannerBgImg  from '../assets/banner-bg.webp'
import heroImg1  from '../assets/slide1.webp'
import heroImg2  from '../assets/slide2.webp'
import heroImg3  from '../assets/slide3.webp'
import catImg1  from '../assets/bed-icn.webp'
import catImg2  from '../assets/chair-icn.webp'
import catImg3  from '../assets/table-icn.webp'
import catImg4  from '../assets/sofa-icn.webp'
import catImg5  from '../assets/kids-icn.webp'
import centreImg1  from '../assets/center-img1.webp'
import centreImg2  from '../assets/center-img2.webp'
import offerImg3  from '../assets/hero4.webp'
import companyImg1  from '../assets/company-img1.webp'
import companyImg2  from '../assets/company-img2.webp'
import companyImg3  from '../assets/company-img3.webp'
import companyImg4  from '../assets/company-img4.webp'
import { HiArrowRight, HiOutlineArrowPath, HiOutlineShieldCheck, HiOutlineSparkles, HiOutlineTruck } from 'react-icons/hi2';
import CarouselContainer from '../components/CarouselContainer';
import { QueryClient } from '@tanstack/react-query';
import { LandingLoaderData } from '../types';
import { featuredProductsQuery } from '../queries';

export const loader = (queryClient: QueryClient) => async(): Promise<LandingLoaderData> => {
  const products = await queryClient.ensureQueryData(featuredProductsQuery)
  return {products}
}

const perks = [
  { icon: HiOutlineTruck, title: 'Free delivery', text: 'On every order over $500' },
  { icon: HiOutlineSparkles, title: 'Curated designs', text: 'Pieces picked by our stylists' },
  { icon: HiOutlineShieldCheck, title: 'Secure checkout', text: 'Your details stay protected' },
  { icon: HiOutlineArrowPath, title: 'Easy returns', text: 'Hassle-free within 30 days' },
]

const offers = [
  { image: centreImg1, tag: 'New season', title: 'Tables made for gathering', url: '/products?search=&category=Tables' },
  { image: centreImg2, tag: 'Best sellers', title: 'Chairs with character', url: '/products?search=&category=Chairs' },
  { image: offerImg3, tag: 'Bedroom edit', title: 'Rest easy, sleep in style', url: '/products?search=&category=Beds' },
]

const brands = [
  { name: 'Artifex', image: companyImg1 },
  { name: 'Luxora', image: companyImg2 },
  { name: 'Comfora', image: companyImg3 },
  { name: 'Modenza', image: companyImg4 },
]

const Landing = () => {
  return (
    <>
    <div className="relative w-full overflow-hidden bg-neutral">
      <div className='absolute inset-0 bg-cover bg-center' style={{backgroundImage: `url(${bannerBgImg})`}}></div>
      <div className="absolute inset-0 bg-gradient-to-r from-neutral via-neutral/80 to-neutral/30"></div>
      <div className="align-element relative grid items-center gap-12 py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/90 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
            New collection 2026
          </span>
          <h1 className="mt-6 max-w-2xl font-display text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-6xl">
            A touch of finesse <span className="italic text-accent">transforming</span> your home
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/75">
          At D store, we are more than equipped to help you find anything and everything you require to create a home that is a dream to live in.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link className="btn btn-primary px-8" to="/products">Our Products <HiArrowRight /></Link>
            <Link className="btn btn-outline border-white/40 px-8 text-white hover:border-white hover:bg-white hover:text-neutral" to="/about">Our story</Link>
          </div>
          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-white/15 pt-8">
            <div>
              <dt className="text-xs uppercase tracking-widest text-white/50">Brands</dt>
              <dd className="mt-1 font-display text-2xl font-semibold text-white">5+</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest text-white/50">Categories</dt>
              <dd className="mt-1 font-display text-2xl font-semibold text-white">5</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest text-white/50">Delivery</dt>
              <dd className="mt-1 font-display text-2xl font-semibold text-white">Free</dd>
            </div>
          </dl>
        </div>
        <CarouselContainer image1={heroImg1} image2={heroImg2} image3={heroImg3} />
      </div>
    </div>

    <div className="border-b border-base-300 bg-base-200">
      <div className="align-element grid grid-cols-2 gap-6 py-8 lg:grid-cols-4">
        {perks.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-center gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-base-100 text-primary shadow-sm">
              <Icon className="h-6 w-6" />
            </span>
            <div>
              <p className="text-sm font-semibold">{title}</p>
              <p className="text-xs text-base-content/60">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className='align-element py-20'>
      <p className="eyebrow">Browse</p>
      <h2 className="section-title mt-2 mb-12">Shop by category</h2>
      <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2'>
        <li>
          <Link to={'/products?search=&category=Beds'} className='flex flex-col items-center group'>
            <img loading="lazy" decoding="async" src={catImg1} alt="Beds" className='transition duration-300 ease-out hover:-translate-y-4 mb-2' />
            <p className='font-semibold transition duration-300 ease-out group-hover:text-primary'>Beds</p>
          </Link>
        </li>
        <li>
          <Link to={'/products?search=&category=Chairs'} className='flex flex-col items-center group'>
            <img loading="lazy" decoding="async" src={catImg2} alt="Chairs" className='transition duration-300 ease-out hover:-translate-y-4 mb-2' />
            <p className='font-semibold transition duration-300 ease-out group-hover:text-primary'>Chairs</p>
          </Link>
        </li>
        <li>
          <Link to={'/products?search=&category=Tables'} className='flex flex-col items-center group'>
            <img loading="lazy" decoding="async" src={catImg3} alt="Tables" className='transition duration-300 ease-out hover:-translate-y-4 mb-2' />
            <p className='font-semibold transition duration-300 ease-out group-hover:text-primary'>Tables</p>
          </Link>
        </li>
        <li>
          <Link to={'/products?search=&category=Sofas'} className='flex flex-col items-center group'>
            <img loading="lazy" decoding="async" src={catImg4} alt="Sofas" className='transition duration-300 ease-out hover:-translate-y-4 mb-2' />
            <p className='font-semibold transition duration-300 ease-out group-hover:text-primary'>Sofas</p>
          </Link>
        </li>
        <li>
          <Link to={'/products?search=&category=Kids'} className='flex flex-col items-center group'>
            <img loading="lazy" decoding="async" src={catImg5} alt="Kids" className='transition duration-300 ease-out hover:-translate-y-4 mb-2' />
            <p className='font-semibold transition duration-300 ease-out group-hover:text-primary'>Kids</p>
          </Link>
        </li>
      </ul>
    </div>

    <div className='align-element pb-20'>
      <p className="eyebrow">Our offers</p>
      <h2 className="section-title mt-2 mb-12">Make your home a masterpiece</h2>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
        {offers.map(offer => (
          <Link key={offer.title} to={offer.url} className='group relative block overflow-hidden rounded-3xl'>
            <img loading="lazy" decoding="async" src={offer.image} alt={offer.title} className='aspect-[4/5] w-full object-cover transition duration-700 ease-out group-hover:scale-110' />
            <div className='absolute inset-0 bg-gradient-to-t from-neutral/90 via-neutral/30 to-transparent'></div>
            <div className='absolute inset-x-0 bottom-0 p-8 text-white'>
              <span className='badge border-0 bg-white/20 text-white backdrop-blur'>{offer.tag}</span>
              <h4 className='mt-3 font-display text-2xl font-semibold'>{offer.title}</h4>
              <p className='mt-3 inline-flex items-center gap-2 text-sm font-medium text-white/80 transition group-hover:gap-3 group-hover:text-white'>Discover unique finds <HiArrowRight /></p>
            </div>
          </Link>
        ))}
      </div>
    </div>

    <div className='bg-base-200 py-20'>
      <div className="align-element">
        <FeaturedProducts />
      </div>
    </div>

    <div className='align-element py-20'>
      <p className="eyebrow">Our partners</p>
      <h2 className="section-title mt-2 mb-12">Choose from brands</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {brands.map(brand => (
          <Link key={brand.name} to={`/products?company=${brand.name}`} className='group relative block overflow-hidden rounded-3xl'>
            <img loading="lazy" decoding="async" src={brand.image} alt={brand.name} className='aspect-[3/4] w-full object-cover transition duration-700 ease-out group-hover:scale-110' />
            <div className='absolute inset-0 bg-gradient-to-t from-neutral/80 via-transparent to-transparent'></div>
            <div className='absolute inset-x-0 bottom-0 flex items-center justify-between p-6 text-white'>
              <h4 className='font-display text-2xl font-semibold'>{brand.name}</h4>
              <span className='grid h-10 w-10 place-items-center rounded-full bg-white/20 backdrop-blur transition group-hover:bg-primary'><HiArrowRight /></span>
            </div>
          </Link>
        ))}
      </div>
    </div>

    <div className="align-element pb-20">
      <div className="relative overflow-hidden rounded-[2rem] bg-secondary px-8 py-16 text-center text-secondary-content sm:px-16">
        <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/5"></div>
        <div className="absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-accent/20"></div>
        <div className="relative">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Ready to refresh your space?</h2>
          <p className="mx-auto mt-4 max-w-xl text-secondary-content/75">Explore the full collection and find the pieces that make your home feel like yours.</p>
          <Link to="/products" className="btn btn-accent mt-8 px-10">Shop the collection <HiArrowRight /></Link>
        </div>
      </div>
    </div>
    </>
  )
}

export default Landing
