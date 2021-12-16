import React, { useEffect, useState } from "react";
import { NavLink, Switch, Route, useLocation } from "react-router-dom";
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

const App = ({ logged, goUp, toggleMobileMode, mobileMode, checkout }) => {
  const [width, setWidth] = useState(window.innerWidth);

  //burger menu handle
  window.addEventListener("resize", () => setWidth(window.innerWidth));
  useEffect(() => {
    if (width > 765) {
      toggleMobileMode();
    }
  }, [width, toggleMobileMode]);

  const burgerHandle = () => {
    toggleMobileMode(mobileMode);
  };
  console.log(`mobileMode`, mobileMode);
  
  //onChange path goUp site
  let location = useLocation();
  useEffect(() => {
    if (location) {
      goUp();
    }
  }, [goUp, location]);

  return (
    <div className="app-container">
      {mobileMode ? (
        <div className="overlay-burger" onClick={burgerHandle} />
      ) : null}
      <nav className="main-nav">
        <AiOutlineMenu onClick={burgerHandle} className="burger-menu" />
        {checkout.length > 0 ? (
          <NavLink className="basket-navLink" to="/basket">
            <div>
              <RiShoppingCart2Line
                type="button"
                // onClick={() => toggleOpenModal()}
                className="basket-icon"
              />
              <div className="amount-basket">{checkout.length}</div>
            </div>
          </NavLink>
        ) : null}
        {mobileMode ? (
          <div className="navlink-box" id="burgerSidebar">
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
          </div>
        ) : null}
      </nav>
      <Switch>
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
