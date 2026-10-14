import React from 'react'
import { ActionFunctionArgs, Form, Link, redirect } from 'react-router-dom'
import { AxiosError } from 'axios'
import { ApiErrorBody } from '../types'
import FormInput from '../components/FormInput'
import AuthLayout from '../components/AuthLayout'
import registerImg from '../assets/hero2.webp'
import { customFetch } from '../utils'
import { toast } from 'react-toastify'

export const action = async({request}: ActionFunctionArgs) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  
  try {
    const response = await customFetch.post("/auth/local/register", data);
    toast.success("Account created successfully!")
    return redirect("/login")
  } catch (e) {
    const error = e as AxiosError<ApiErrorBody>
    const errorMessage = error?.response?.data?.error?.message
    toast.error(errorMessage)
    return null
  }
  
}

const Register = () => {
  return (
    <AuthLayout image={registerImg} quote="Join DStore and start building a home you love.">
      <Form method='post' className='flex flex-col gap-y-4 rounded-3xl bg-base-100 p-8 shadow-xl lg:p-0 lg:shadow-none'>
        <div>
          <h4 className="font-display text-4xl font-semibold tracking-tight">Register</h4>
          <p className="mt-2 text-base-content/60">Create an account in less than a minute.</p>
        </div>
        <FormInput type="text" text="Username" name="username" placeholder="Enter your name" defaultValue="" />
        <FormInput type="email" text="Email" name="email" placeholder="Enter your email" defaultValue="" />
        <FormInput type="password" text="Password" name="password" placeholder="Enter your password" />
        <div className="mt-4">
          <button type='submit' className='btn btn-primary btn-block'>Register</button>
        </div>
        <p className="mt-2 text-center text-sm text-base-content/70">
          Already a member?<Link className="ml-2 link link-hover link-primary font-semibold capitalize" to="/login">login</Link>
        </p>
      </Form>
    </AuthLayout>
  )
}

export default Register