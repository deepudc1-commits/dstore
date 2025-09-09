import React from 'react'
import { Form, Link, redirect } from 'react-router-dom'
import FormInput from '../components/FormInput'
import { customFetch } from '../utils'
import { toast } from 'react-toastify'

export const action = async({request}) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  
  try {
    const response = await customFetch.post("/auth/local/register", data);
    toast.success("Account created successfully!")
    return redirect("/login")
  } catch (error) {
    const errorMessage = error?.response?.data?.error?.message
    toast.error(errorMessage)
    return null
  }
  
}

const Register = () => {
  return (
    <>
      <section className='h-screen grid place-items-center'>
        <Form method='post' className='card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'>
          <h4 className="text-center text-3xl font-bold">Register</h4>
          <FormInput type="text" text="Username" name="username" placeholder="Enter your name" defaultValue="" />
          <FormInput type="email" text="Email" name="email" placeholder="Enter your email" defaultValue="" />
          <FormInput type="password" text="Password" name="password" placeholder="Enter your password" />
          <div className="mt-4">
            <button type='submit' className='btn btn-primary btn-block'>Register</button>
          </div>
          <p className="text-center">
            Already a member?<Link className="ml-2 link link-hover link-primary capitalize" to="/login">login</Link>
          </p>
        </Form>
      </section>
    </>
  )
}

export default Register