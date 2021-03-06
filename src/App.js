/* eslint-disable react/prop-types */
import 'animate.css'
import {
  NavLink,
  Redirect,
  Route,
  Switch,
  useLocation
} from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { goUp, toggleMobileMode, toggleOpenModal } from './bikes/duck/index'
import { AiOutlineMenu } from 'react-icons/ai'
import Basket from './components/Basket/Basket'
import BikeCard from './components/BikeCard/BikeCard'
import Dashboard from './components/Dashboard/Dashborad'
import Footer from './components/Footer/Footer'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import { RiShoppingCart2Line } from 'react-icons/ri'
import Shop from './components/Shop/Shop'
import { connect } from 'react-redux'

const App = ({ logged, goUp, toggleMobileMode, mobileMode, checkout }) => {
  const [width, setWidth] = useState(window.innerWidth)
  const [burger, setBurger] = useState(false)
  const [show, setShow] = useState(true)

  // burger menu handle
  window.addEventListener('resize', () => setWidth(window.innerWidth))
  useEffect(() => {
    if (width < 765) {
      toggleMobileMode(true)
      setBurger(false)
    } else {
      toggleMobileMode(false)
    }
  }, [toggleMobileMode, width])

  const burgerHandle = () => {
    setBurger((prev) => !prev)
  }

  // onChange path goUp site
  const location = useLocation()
  useEffect(() => {
    if (location) {
      goUp()
      setBurger(false)
    }
  }, [goUp, location])

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY >= 100 && !mobileMode) {
        setShow(false)
      } else {
        setShow(true)
      }
    }

    window.addEventListener('scroll', controlNavbar)
    return () => {
      window.removeEventListener('scroll', controlNavbar)
    }
  }, [mobileMode])

  return (
    <div className="app-container">
      {
      burger
        ? (
        <div className="overlay-burger" onClick={burgerHandle} />
          )
        : null}
      <nav className={`main-nav ${!show && 'main-nav-hide'} `}>
        <AiOutlineMenu onClick={burgerHandle} className="burger-menu" />
        {checkout.length > 0
          ? (
          <NavLink className="basket-nav-link" to="/basket">
            <div>
              <RiShoppingCart2Line type="button" className="basket-icon" />
              <div className="amount-basket">{checkout.length}</div>
            </div>
          </NavLink>
            )
          : null}
        <nav className={burger ? 'navlink-box active' : 'navlink-box'}>
          <NavLink className="nav-link" exact to="/home">
            Home
          </NavLink>

          <NavLink className="nav-link" to="/register">
            Register
          </NavLink>

          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>

          {logged
            ? (
            <NavLink className="nav-link" to="/dashboard">
              Dashboard
            </NavLink>
              )
            : null}
          <NavLink className="nav-link" to="/shop">
            Shop
          </NavLink>
        </nav>
      </nav>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route path="/home" exact component={Home} />
        <Route path="/shop" component={Shop} />
        <Route path="/bike/:id" component={BikeCard} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/basket" component={Basket} />
      </Switch>
      <Footer />
    </div>
  )
}

export default connect(
  (state) => ({
    logged: state.accounts.logged,
    mobileMode: state.products.mobileMode,
    checkout: state.products.checkout,
    openModal: state.products.openModal
  }),
  { goUp, toggleMobileMode, toggleOpenModal }
)(App)
