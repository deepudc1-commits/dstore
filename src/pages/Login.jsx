import React from 'react'
import FormInput from '../components/FormInput'
import { Form, Link, redirect, useNavigate } from 'react-router-dom'
import { customFetch } from '../utils'
import { toast } from 'react-toastify'
import { loginUser } from '../features/user/userSlice'
import { useDispatch } from 'react-redux'

//Adding this action as a function inside a function because we are 
//passing the store as an argument in the LoginAction in app.js. Not doing so will result in an error.
export const action = (store) => async({request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData)

  try {
    const response = await customFetch.post("/auth/local", data)
    store.dispatch(loginUser(response.data))
    toast.success("You have been successfully logged in!")
    return redirect("/")
  } catch (error) {
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
      const response = await customFetch.post("/auth/local", {identifier: 'james@gmail.com', password: 'secret'})
      dispatch(loginUser(response.data))
      toast.success("Logged in guest user")
      return navigate("/")
    } catch (error) {
      const errorMessage = error.response.data.error.message
      toast.error(errorMessage)
      return null
    }
  }

  return (
    <>
      <section className='h-screen grid place-items-center'>
        <Form method='post' className='card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'>
          <h4 className="text-center text-3xl font-bold">Login</h4>
          <FormInput type="email" text="Email" name="identifier" placeholder="Enter your email" defaultValue="" />
          <FormInput type="password" text="Password" name="password" placeholder="Enter your password" defaultValue="" />
          <div className="mt-2">
            <button type='submit' className='btn btn-primary btn-block'>Login</button>
          </div>
          <div className="mt-4">
            <button type='button' className='btn btn-secondary btn-block' onClick={() => loginAsGuest()}>Guest user</button>
          </div>
          <p className="text-center">
            Not a member?<Link className="ml-2 link link-hover link-primary capitalize" to="/register">create account</Link>
          </p>
        </Form>
      </section>
    </>
  )
}

export default Login