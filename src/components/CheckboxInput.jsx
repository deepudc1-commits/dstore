import React from 'react'

const CheckboxInput = ({name, text, defaultChecked, size}) => {
  return (
    <div className='form-control items-center'>
    <label htmlFor={name} className='label cursor-pointer'>
        <span className='label-text capitalize'>{text}</span>
    </label>
    <input type='checkbox' name={name} defaultChecked={defaultChecked} className={`checkbox checkbox-primary ${size}`} />
    </div>
  )
}

export default CheckboxInput