import React from "react";
import { NavLink, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import "animate.css";
import Shop from "./components/Shop/Shop";
import BikeCard from "./components/BikeCard/BikeCard";

//Animation and Card

const App = () => {
  return (
    <div className="app-container">
      <nav className="main-nav">
        <NavLink className="NavLink" to="/home">
          Home
        </NavLink>
        <NavLink className="NavLink" to="/shop">
          Shop
        </NavLink>
      </nav>
      <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/shop" component={Shop} />
        <Route path="/bike/:id" component={BikeCard} />
      </Switch>
      <footer>information footer</footer>
    </div>
  );
};

export default App;
