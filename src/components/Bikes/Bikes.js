import React from "react";
import formatCurrency, { AvaibleCurrency } from "../../livehacks";
import "./Bikes.scss";

const Bikes = (props) => {
  return props.bikes.map((bike) => (
    <div className="card">
      <div className="tittle-box">
        <h4 className="tittle">{bike.tittle}</h4>
        <a href={"#" + bike._id}>
          <img src={bike.image} alt={bike.tittle}></img>
        </a>
      </div>
      <div className="description-box">
        <p>{bike.description}</p>
        <p>Sizes: {AvaibleCurrency(bike.avaibleSizesz)}</p>
      </div>
      <div className="price-box">
        <h4>{formatCurrency(bike.price)}</h4>
        <div class="btn-1">
          <a href="">
            <span>BUY</span>
          </a>
        </div>
      </div>
    </div>
  ));
};

export default Bikes;
