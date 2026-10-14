import React from 'react'
import FormInput from '../components/FormInput'
import AuthLayout from '../components/AuthLayout'
import loginImg from '../assets/hero1.webp'
import { ActionFunctionArgs, Form, Link, redirect, useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { customFetch } from '../utils'
import { toast } from 'react-toastify'
import { loginUser } from '../features/user/userSlice'
import { useDispatch } from 'react-redux'
import { AppStore } from '../store'
import { ApiErrorBody, AuthResponse } from '../types'

//Adding this action as a function inside a function because we are 
//passing the store as an argument in the LoginAction in app.js. Not doing so will result in an error.
export const action = (store: AppStore) => async({request}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData)

  try {
    const response = await customFetch.post<AuthResponse>("/auth/local", data)
    store.dispatch(loginUser(response.data))
    toast.success("You have been successfully logged in!")
    return redirect("/")
  } catch (e) {
    const error = e as AxiosError<ApiErrorBody>
    const errorMessage = error?.response?.data?.error?.message
    toast.error(errorMessage)
    return null
  }
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const loginAsGuest = async() => {
    try {
      const response = await customFetch.post<AuthResponse>("/auth/local", {identifier: 'demouser@test.com', password: 'secret'})
      dispatch(loginUser(response.data))
      toast.success("Logged in guest user")
      return navigate("/")
    } catch (e) {
      const error = e as AxiosError<ApiErrorBody>
      const errorMessage = error.response!.data.error!.message
      toast.error(errorMessage)
      return null
    }
  }

  return (
    <AuthLayout image={loginImg} quote="Welcome back. Your next favourite piece is waiting.">
      <Form method='post' className='flex flex-col gap-y-4 rounded-3xl bg-base-100 p-8 shadow-xl lg:p-0 lg:shadow-none'>
        <div>
          <h4 className="font-display text-4xl font-semibold tracking-tight">Login</h4>
          <p className="mt-2 text-base-content/60">Sign in to check out and see your orders.</p>
        </div>
        <FormInput type="email" text="Email" name="identifier" placeholder="Enter your email" defaultValue="" />
        <FormInput type="password" text="Password" name="password" placeholder="Enter your password" defaultValue="" />
        <div className="mt-2">
          <button type='submit' className='btn btn-primary btn-block'>Login</button>
        </div>
        <div className="divider my-0 text-xs text-base-content/50">OR</div>
        <div>
          <button type='button' className='btn btn-outline btn-block border-base-300 hover:border-neutral hover:bg-neutral' onClick={() => loginAsGuest()}>Guest user</button>
        </div>
        <p className="mt-2 text-center text-sm text-base-content/70">
          Not a member?<Link className="ml-2 link link-hover link-primary font-semibold capitalize" to="/register">create account</Link>
        </p>
      </Form>
    </AuthLayout>
  )
}

export default Login