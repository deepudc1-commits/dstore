import React, { useState } from 'react'
import { formatPrice } from '../utils';

type RangeInputProps = {
  text: string
  name: string
  size?: string
  price?: string
}

const RangeInput = ({ text, name, size, price }: RangeInputProps) => {

    const step = 1000;
    const maxPrice = 100000;
    const [selectedPrice, setSelectedPrice] = useState<number | string>(price || maxPrice);

  return (
    <div className='form-control'>
      <label htmlFor={name} className='label cursor-pointer pb-1.5'>
        <span className='label-text text-xs font-semibold uppercase tracking-wider text-base-content/60'>{text}</span>
        <span className='text-sm font-semibold text-primary'>{formatPrice(selectedPrice)}</span>
      </label>
      <input
        type='range'
        name={name}
        id={name}
        min={0}
        max={maxPrice}
        value={selectedPrice}
        onChange={(e) => setSelectedPrice(e.target.value)}
        className={`range range-primary range-sm ${size ?? ''}`}
        step={step}
      />
      <div className='w-full flex justify-between text-xs px-1 mt-2 text-base-content/50'>
        <span>0</span>
        <span>Max: {formatPrice(maxPrice)}</span>
      </div>
    </div>
  );
}

export default RangeInput
