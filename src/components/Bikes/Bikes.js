import React from "react";
import formatCurrency, { AvaibleCurrency } from "../../livehacks";
import { RiShoppingBag2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./Bikes.scss";

const Bikes = (props) => {

  return props.bikes.map((bike) => (
    <div key={bike._id} className="card animate__animated animate__fadeIn">
      <div className="tittle-box">
        <h4 className="tittle">{bike.tittle}</h4>
        <Link to={`/bike/${bike._id}`} >
          <img src={bike.image} alt={bike.tittle}></img>
        </Link>
      </div>
      <div className="description-box">
        <p>{bike.description}</p>
        <p>sizes: {AvaibleCurrency(bike.avaibleSizesz)}</p>
      </div>
      <div className="price-box">
        <h4>{formatCurrency(bike.price)}</h4>
        <button className="btn-3" onClick={() => props.addToBasket(bike)}>
          <RiShoppingBag2Line />
          Add
        </button>
      </div>
    </div>
  ));
};

export default Bikes;
