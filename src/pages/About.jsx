import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div>
        <h1 className="max-w-xl text-4xl font-bold tracking-tight sm:text-6xl mx-auto">We are changing the way people shop</h1>
        <p className="mt-8 max-w-xl text-lg leading-8 mx-auto">
        We offer an unprecedent variety in products in almost every category. Whether you’re looking for unique styles, cohesive textures and colours, or items that fall within a specific price range, we have it all.
        </p>
        <div className="mt-10 mx-auto text-center">
            <Link className="btn btn-primary" to="/products">Check out our Products</Link>
        </div>
    </div>
  )
}

export default About
