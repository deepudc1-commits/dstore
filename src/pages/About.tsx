import React from 'react'
import { Link } from 'react-router-dom'
import { HiArrowRight } from 'react-icons/hi2'
import aboutImg from '../assets/hero4.webp'
import aboutImg2 from '../assets/hero3.webp'

const values = [
  { title: 'Thoughtful design', text: 'Every piece is chosen for how it looks, how it feels and how it lives with you.' },
  { title: 'Built to last', text: 'We work with brands that care about materials and craftsmanship as much as we do.' },
  { title: 'Made simple', text: 'Clear prices, easy browsing and a checkout that takes just a few clicks.' },
]

const About = () => {
  return (
    <>
      <div className='align-element grid items-center gap-12 py-20 lg:grid-cols-2 lg:gap-20'>
        <div>
          <p className="eyebrow">About DStore</p>
          <h1 className="mt-4 max-w-xl font-display text-4xl font-semibold tracking-tight sm:text-6xl">We are changing the way people shop</h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-base-content/70">
          We offer an unprecedent variety in products in almost every category. Whether you’re looking for unique styles, cohesive textures and colours, or items that fall within a specific price range, we have it all.
          </p>
          <div className="mt-10">
              <Link className="btn btn-primary px-8" to="/products">Check out our Products <HiArrowRight /></Link>
          </div>
        </div>
        <div className="relative">
          <img src={aboutImg} alt="A calm, modern bedroom" className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-2xl" />
          <img src={aboutImg2} alt="" className="absolute -bottom-10 -left-10 hidden aspect-square w-48 rounded-3xl border-8 border-base-100 object-cover shadow-xl sm:block" />
        </div>
      </div>

      <div className="bg-base-200 py-20">
        <div className="align-element">
          <p className="eyebrow">What we stand for</p>
          <h2 className="section-title mt-2">Our values</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((value, index) => (
              <div key={value.title} className="rounded-3xl bg-base-100 p-8 shadow-sm">
                <span className="font-display text-4xl font-semibold text-primary/30">0{index + 1}</span>
                <h3 className="mt-4 font-display text-xl font-semibold">{value.title}</h3>
                <p className="mt-3 text-sm leading-6 text-base-content/70">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default About
