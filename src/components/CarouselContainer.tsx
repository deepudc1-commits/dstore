import React, { useRef, useState } from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'

type CarouselContainerProps = {
  image1: string
  image2: string
  image3: string
}

const CarouselContainer = ({image1, image2, image3}: CarouselContainerProps) => {
  const images = [image1, image2, image3]
  const trackRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)

  const goTo = (index: number) => {
    const next = (index + images.length) % images.length
    const track = trackRef.current
    if (track) track.scrollTo({ left: track.clientWidth * next, behavior: 'smooth' })
    setCurrent(next)
  }

  return (
    <div className="relative">
      <div ref={trackRef} className="carousel w-full overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-white/10">
        {images.map((image, index) => (
          <div key={index} className="carousel-item w-full">
            <img src={image} alt={`Featured interior ${index + 1}`} className="aspect-[4/3] w-full object-cover" />
          </div>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-5 flex items-center justify-between px-5">
        <div className="flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Show slide ${index + 1}`}
              onClick={() => goTo(index)}
              className={`h-2 rounded-full transition-all ${index === current ? 'w-8 bg-white' : 'w-2 bg-white/50'}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" aria-label="Previous slide" onClick={() => goTo(current - 1)} className="btn btn-circle btn-sm border-0 bg-white/80 text-neutral backdrop-blur hover:bg-white">
            <HiChevronLeft className="h-4 w-4" />
          </button>
          <button type="button" aria-label="Next slide" onClick={() => goTo(current + 1)} className="btn btn-circle btn-sm border-0 bg-white/80 text-neutral backdrop-blur hover:bg-white">
            <HiChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CarouselContainer
