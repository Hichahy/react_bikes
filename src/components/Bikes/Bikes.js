import React, { useEffect, useState } from "react";
import formatCurrency, { AvaibleCurrency } from "../../livehacks";
import { RiShoppingBag2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  addBike,
  loadBike,
  selectSize,
  addToCheckout,
  selectColor,
} from "../../bikes/duck/index";
import "./Bikes.scss";

const Bikes = (props) => {
  const loadingBikes = props.loadBike;
  useEffect(() => {
    loadingBikes();
  }, [loadingBikes]);

  //loading data
  if (props.assortment.length < 1) {
    return (
      <div className="loading">
        <img
          className="whell-load"
          src="/Images/wheel.png"
          alt="wheel loading"
        />
        <p className="animate__animated animate__pulse animate__infinite">
          Loading ...
        </p>
      </div>
    );
  }

  //no found for search
  if (props.filteredItems.length < 1) {
    return (
      <p className="p-not-found animate__animated animate__pulse animate__infinite">
        sorry, not found {props.letters}{" "}
      </p>
    );
  }

  return props.filteredItems.map((bike) => (
    <div key={bike._id} className="card animate__animated animate__fadeIn">
      <div className="tittle-box">
        <h4 className="tittle">{bike.tittle}</h4>
      </div>
      <Link to={`/bike/${bike._id}`}>
        <div className="image-box">
          <img src={bike.image} alt={bike.tittle}></img>
        </div>
      </Link>

      <div className="description-box">
        <p>{bike.description}</p>
        <div className="size_box">
          <label>Sizes:</label>
          {bike.avaibleSizesz.map((size, index) => (
            <div key={index} className="option">
              <input
                value={size[index]}
                onClick={() =>
                  props.selectSize(bike.avaibleSizesz[index], bike._id)
                }
                name={bike._id}
                id={size}
                type="radio"
                defaultChecked={index === 0}
              />
              <p>{size},</p>
            </div>
          ))}
        </div>
        <div className="color-box">
          <label>Colors:</label>
          {bike.avaibleColors.map((color, index) => (
            <li style={{ listStyle: "none" }} key={index}>
              <option
                onClick={() => {
                  props.selectColor(bike.avaibleColors[index], bike._id);
                }}
                className={`colors-select ${
                  color === bike.selectedColor ? "c-selected" : ""
                }`}
                style={{ background: `${color}` }}
                value={color[index]}
              ></option>
            </li>
          ))}
        </div>
      </div>

      <div className="price-box">
        <h4>{formatCurrency(bike.price)}</h4>
        <button
          className="btn-3"
          onClick={() => {
            props.addBike(bike);
            props.addToCheckout(bike);
          }}
        >
          <RiShoppingBag2Line />
          Add
        </button>
      </div>
    </div>
  ));
};

export default connect(
  (state) => ({
    assortment: state.products.assortment,
    filteredItems: state.products.filteredItems,
    letters: state.products.letters,
    checkout: state.products.checkout,
  }),
  {
    addBike,
    loadBike,
    selectSize,
    selectColor,
    addToCheckout,
  }
)(Bikes);
