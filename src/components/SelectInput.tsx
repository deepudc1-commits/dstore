import React from 'react'

type SelectInputProps = {
  text: string
  name: string
  list: string[]
  size?: string
  defaultValue?: string
}

const SelectInput = ({text, name, list, size, defaultValue}: SelectInputProps) => {
  return (
    <label htmlFor={name} className="form-control w-full">
        <div className="label pb-1.5">
            <span className="label-text text-xs font-semibold uppercase tracking-wider text-base-content/60">{text}</span>
        </div>
        <select name={name} id={name} defaultValue={defaultValue} className={`select select-bordered w-full rounded-xl border-base-300 bg-base-100 capitalize focus:border-primary focus:outline-none ${size}`}>
            {list.map((item) => {
               return <option key={item} value={item}>{item}</option>
            })}
        </select>
    </label>
  )
}

export default SelectInput
