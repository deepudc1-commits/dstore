import React from 'react'
import { Link, NavLink, Outlet, useNavigate, useNavigation } from 'react-router-dom'
import {BsCart3} from 'react-icons/bs'
import { HiMiniBars3BottomLeft } from 'react-icons/hi2'
import { FaFacebookF, FaInstagram, FaPinterestP, FaTwitter } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { useQueryClient } from '@tanstack/react-query'
import { logoutUser } from '../features/user/userSlice'
import { clearCart } from '../features/cart/cartSlice'
import Loading from '../components/Loading'
import { RootState } from '../store'

const links = [
  { id: 1, url: '/', text: 'home' },
  { id: 2, url: 'about', text: 'about' },
  { id: 3, url: 'products', text: 'products' },
  { id: 4, url: 'cart', text: 'cart' },
  { id: 5, url: 'checkout', text: 'checkout' },
  { id: 6, url: 'orders', text: 'orders' },
];

const footerShopLinks = [
  { text: 'Beds', url: '/products?search=&category=Beds' },
  { text: 'Chairs', url: '/products?search=&category=Chairs' },
  { text: 'Tables', url: '/products?search=&category=Tables' },
  { text: 'Sofas', url: '/products?search=&category=Sofas' },
  { text: 'Kids', url: '/products?search=&category=Kids' },
];

const Logo = () => (
  <Link to="/" className="font-display text-2xl font-bold tracking-tight">
    D<span className="text-primary">Store</span>
  </Link>
)

const HomeLayout = () => {
  const {itemsInCart} = useSelector((state: RootState) => state.cart)
  const {user} = useSelector((state: RootState) => state.userState)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const navigation = useNavigation()
  const isPageLoading = navigation.state === 'loading'

  const handleLogout = () => {
    navigate("/")
    dispatch(logoutUser())
    dispatch(clearCart())
    queryClient.removeQueries({ queryKey: ['orders'] })
  }

  const visibleLinks = links.filter(link => !((link.url === 'checkout' || link.url === 'orders') && !user))

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `capitalize rounded-full px-4 py-2 text-sm font-medium transition-colors ${isActive ? 'bg-neutral text-neutral-content' : 'text-base-content/70 hover:text-base-content hover:bg-base-200'}`

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-neutral py-2 text-xs text-neutral-content sm:text-sm">
        <div className="align-element flex items-center justify-center sm:justify-between">
          <p className="hidden text-neutral-content/70 sm:block">Free delivery on every order over $500</p>
          <div className="flex gap-x-6 justify-center items-center">
            {user ?
            <>
              <span>Hi, <span className="font-semibold">{user.username}</span></span>
              <button onClick={() => handleLogout()} className="link link-hover text-xs sm:text-sm">Logout</button>
            </> :
            <>
              <Link className="link link-hover text-xs sm:text-sm" to="/login">Sign in / Guest</Link>
              <Link className="link link-hover text-xs sm:text-sm" to="/register">Create Account</Link>
            </>}
          </div>
        </div>
      </header>

      <nav className="sticky top-0 z-30 border-b border-base-300/70 bg-base-100/85 backdrop-blur-md">
        <div className="navbar align-element min-h-[4.5rem]">
          <div className="navbar-start gap-2">
            <div className="dropdown lg:hidden">
              <label tabIndex={0} className="btn btn-ghost btn-circle" aria-label="Open menu">
                <HiMiniBars3BottomLeft className="h-6 w-6" />
              </label>
              <ul tabIndex={0} className="menu dropdown-content z-40 mt-3 w-56 rounded-box border border-base-300 bg-base-100 p-2 shadow-xl">
                {visibleLinks.map(link => (
                  <li key={link.id}><NavLink className="capitalize" to={link.url}>{link.text}</NavLink></li>
                ))}
              </ul>
            </div>
            <Logo />
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="flex items-center gap-1">
              {visibleLinks.map(link => (
                <li key={link.id}><NavLink className={navLinkClass} to={link.url} end={link.url === '/'}>{link.text}</NavLink></li>
              ))}
            </ul>
          </div>
          <div className="navbar-end">
            <NavLink to="/cart" className="btn btn-ghost btn-circle btn-md" aria-label="Cart">
              <div className="indicator">
                <BsCart3 className='h-6 w-6' />
                <span className='badge badge-sm badge-primary indicator-item font-semibold'>{itemsInCart}</span>
              </div>
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {isPageLoading ? <Loading /> : <section className=''>
          <Outlet />
        </section>
        }
      </main>

      <footer className="bg-neutral text-neutral-content">
        <div className="align-element grid gap-12 py-16 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-6 text-neutral-content/70">
              Thoughtfully designed furniture for every room. Crafted to last, styled to inspire, and delivered to your door.
            </p>
            <div className="mt-6 flex gap-3">
              {[FaInstagram, FaPinterestP, FaFacebookF, FaTwitter].map((Icon, index) => (
                <span key={index} className="grid h-10 w-10 place-items-center rounded-full border border-neutral-content/20 text-neutral-content/80 transition hover:border-primary hover:bg-primary hover:text-primary-content">
                  <Icon />
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-neutral-content/50">Shop</h4>
            <ul className="mt-4 space-y-3 text-sm">
              {footerShopLinks.map(item => (
                <li key={item.text}><Link className="link-hover" to={item.url}>{item.text}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-neutral-content/50">Company</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link className="link-hover" to="/about">About us</Link></li>
              <li><Link className="link-hover" to="/products">All products</Link></li>
              <li><Link className="link-hover" to="/cart">Your cart</Link></li>
              {user && <li><Link className="link-hover" to="/orders">Your orders</Link></li>}
            </ul>
          </div>
        </div>
        <div className="border-t border-neutral-content/10">
          <p className="align-element py-6 text-center text-xs text-neutral-content/50">© {new Date().getFullYear()} DStore. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default HomeLayout
