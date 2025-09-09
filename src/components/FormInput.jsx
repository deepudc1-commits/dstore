import React from 'react'

const FormInput = ({type, text, name, size, placeholder, defaultValue}) => {
  return (
    <label htmlFor={name} className={`form-control w-full`}>
        <div className="label">
            <span className="label-text">{text}</span>
        </div>
        <input type={type} name={name} placeholder={placeholder} defaultValue={defaultValue} className={`input input-bordered w-full ${size}`} />
    </label>
  )
}

export default FormInput