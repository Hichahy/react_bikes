import React from "react";
import { NavLink, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import Home from "./components/Home/Home";
import "animate.css";
import Shop from "./components/Shop/Shop";
import BikeCard from "./components/BikeCard/BikeCard";
import Footer from "./components/Footer/Footer";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashborad";

//Animation and Card

const App = ({ logged }) => {
  return (
    <div className="app-container">
      <nav className="main-nav">
        <NavLink className="NavLink" to="/home">
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
      <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/shop" component={Shop} />
        <Route path="/bike/:id" component={BikeCard} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
      <Footer />
    </div>
  );
};

export default connect(
  (state) => ({
    logged: state.accounts.logged,
  }),
  {}
)(App);
