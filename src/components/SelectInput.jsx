import React from 'react'

const SelectInput = ({text, name, list, size, defaultValue}) => {
  return (
    <label htmlFor={name} className="form-control w-full max-w-xs">
        <div className="label">
            <span className="label-text">{text}</span>
        </div>
        <select name={name} id={name} defaultValue={defaultValue} className={`select select-bordered ${size}`}>
            {list.map((item) => {
               return <option key={item} value={item}>{item}</option>
            })}
        </select>
    </label>
  )
}

export default SelectInput