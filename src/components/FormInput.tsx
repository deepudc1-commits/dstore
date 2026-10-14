import React, { HTMLInputTypeAttribute } from 'react'

type FormInputProps = {
  type: HTMLInputTypeAttribute
  text: string
  name: string
  size?: string
  placeholder?: string
  defaultValue?: string
}

const FormInput = ({type, text, name, size, placeholder, defaultValue}: FormInputProps) => {
  return (
    <label htmlFor={name} className={`form-control w-full`}>
        <div className="label pb-1.5">
            <span className="label-text text-xs font-semibold uppercase tracking-wider text-base-content/60">{text}</span>
        </div>
        <input type={type} name={name} id={name} placeholder={placeholder} defaultValue={defaultValue} className={`input input-bordered w-full rounded-xl border-base-300 bg-base-100 focus:border-primary focus:outline-none ${size}`} />
    </label>
  )
}

export default FormInput
