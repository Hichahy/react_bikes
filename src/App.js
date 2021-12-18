import React, { useEffect, useState } from "react";
import {
  NavLink,
  Switch,
  Route,
  useLocation,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import { AiOutlineMenu } from "react-icons/ai";
import { RiShoppingCart2Line } from "react-icons/ri";
import { goUp, toggleMobileMode, toggleOpenModal } from "./bikes/duck/index";
import Home from "./components/Home/Home";
import "animate.css";
import Shop from "./components/Shop/Shop";
import BikeCard from "./components/BikeCard/BikeCard";
import Footer from "./components/Footer/Footer";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashborad";
import Basket from "./components/Basket/Basket";

const App = ({ logged, goUp, toggleMobileMode, checkout }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [burger, setBurger] = useState(false);
  const [show, setShow] = useState(true);
  console.log(`show`, show)
  
  //burger menu handle
  window.addEventListener("resize", () => setWidth(window.innerWidth));
  useEffect(() => {
    if (width < 765) {
      toggleMobileMode(true);
      setBurger(false);
    } else {
      toggleMobileMode(false);
    }
  }, [toggleMobileMode, width]);

  const burgerHandle = () => {
    setBurger((prev) => !prev);
  };

  //onChange path goUp site
  let location = useLocation();
  useEffect(() => {
    if (location) {
      goUp();
     setBurger(false);
    }
  }, [goUp, location]);

  //nav hide and show
 const controlNavbar = () => {
   if (window.scrollY >= 100) {
     setShow(false)
   } else {
     setShow(true)
   }
 }

 useEffect(() => {
   window.addEventListener("scroll", controlNavbar) 
   return () => {
     window.removeEventListener("scroll", controlNavbar)
   }
 }, [])



  return (
    <div className="app-container">
      {burger ? (
        <div className="overlay-burger" onClick={burgerHandle} />
      ) : null}
      <nav className={`main-nav ${!show && "main-nav__hide"} `} >
        <AiOutlineMenu onClick={burgerHandle} className="burger-menu" />
        {checkout.length > 0 ? (
          <NavLink className="basket-navLink" to="/basket">
            <div>
              <RiShoppingCart2Line type="button" className="basket-icon" />
              <div className="amount-basket">{checkout.length}</div>
            </div>
          </NavLink>
        ) : null}
        <nav className={burger ? "navlink-box active" : "navlink-box"}>
          <NavLink className="NavLink" exact to="/home">
            Home
          </NavLink>

          <NavLink className="NavLink" to="/register">
            Register
          </NavLink>

          <NavLink className="NavLink" to="/login">
            Login
          </NavLink>

          {logged ? (
            <NavLink className="NavLink" to="/dashboard">
              Dashboard
            </NavLink>
          ) : null}
          <NavLink className="NavLink" to="/shop">
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
  );
};

export default connect(
  (state) => ({
    logged: state.accounts.logged,
    mobileMode: state.products.mobileMode,
    checkout: state.products.checkout,
    openModal: state.products.openModal,
  }),
  { goUp, toggleMobileMode, toggleOpenModal }
)(App);
