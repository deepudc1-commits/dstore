import React from 'react'

type CheckboxInputProps = {
  name: string
  text: string
  defaultChecked?: boolean
  size?: string
}

const CheckboxInput = ({name, text, defaultChecked, size}: CheckboxInputProps) => {
  return (
    <div className='form-control'>
    <label htmlFor={name} className='label cursor-pointer justify-start gap-3 rounded-xl border border-base-300 bg-base-100 px-4 py-3'>
        <input type='checkbox' name={name} id={name} defaultChecked={defaultChecked} className={`checkbox checkbox-primary rounded-md ${size}`} />
        <span className='label-text font-medium'>{text}</span>
    </label>
    </div>
  )
}

export default CheckboxInput
