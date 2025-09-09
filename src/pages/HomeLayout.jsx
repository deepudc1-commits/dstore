import React from 'react'
import { Link, NavLink, Outlet, useNavigate, useNavigation } from 'react-router-dom'
import {BsCart3} from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../features/user/userSlice'
import { clearCart } from '../features/cart/cartSlice'
import { Loading } from '../components'

const links = [
  { id: 1, url: '/', text: 'home' },
  { id: 2, url: 'about', text: 'about' },
  { id: 3, url: 'products', text: 'products' },
  { id: 4, url: 'cart', text: 'cart' },
  { id: 5, url: 'checkout', text: 'checkout' },
  { id: 6, url: 'orders', text: 'orders' },
];

const HomeLayout = () => {
  const {itemsInCart} = useSelector(state => state.cart)
  const {user} = useSelector(state => state.userState)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const navigation = useNavigation()
  const isPageLoading = navigation.state === 'loading'

  const handleLogout = () => {
    navigate("/")
    dispatch(logoutUser())
    dispatch(clearCart())
  }

  return (
    <>
      <header className="bg-neutral py-2 text-neutral-content">
        <div className="align-element flex justify-center sm:justify-end">
          <div className="flex gap-x-6 justify-center items-center">
            {user ? 
            <>
              <span>Hi {user.username}</span>
              <button onClick={() => handleLogout()} className="link link-hover text-xs sm:text-sm">Logout</button>
            </> : 
            <>
              <Link className="link link-hover text-xs sm:text-sm" to="/login">Sign in / Guest</Link>
              <Link className="link link-hover text-xs sm:text-sm" to="/register">Create Account</Link>
            </>}
            
          </div>
        </div>
      </header>

      <nav className='bg-base-200'>
        <div className='navbar align-element'>
          <div className='navbar-start'>
            <Link className="hidden lg:flex btn btn-primary text-3xl items-center" to="/">D</Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal">
              {links.map(link => {
                if( (link.url === 'checkout' || link.url === 'orders') && !user ) { return null }
                return <li key={link.id}><NavLink className="capitalize" to={link.url}>{link.text}</NavLink></li>
              })}
            </ul>
          </div>
          <div className="navbar-end">
            <NavLink to="/cart" className="btn btn-ghost btn-circle btn-md ml-4">
              <div className="indicator">
                <BsCart3 className='h-6 w-6' />
                <span className='badge badge-sm badge-primary indicator-item'>{itemsInCart}</span>
              </div>
            </NavLink>
          </div>
        </div>
      </nav>
      {isPageLoading ? <Loading /> : <section className='align-element py-20'>
        <Outlet />
      </section>
      }
      
    </>
  )
}

export default HomeLayout