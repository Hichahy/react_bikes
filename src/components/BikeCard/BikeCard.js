import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Breadcrumbs, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { NavLink } from "react-router-dom";
import data from "../../data.json";
import "./BikeCard.scss";

const BikeCard = ({ assortment }) => {
  const [bikes, setBikes] = useState(data.bikes);

  const { id } = useParams();

  const find = () => {
    return bikes.find((x) => x._id === id);
  };
  let bike = find(id);

  return (
    <div className="product-containter ">
      <div style={{ position: "sticky", top: "10%" }}>
        <Breadcrumbs aria-label="breadcrumb">
          <NavLink className="breadcrumbs_link" to="/shop">
            Shop
          </NavLink>
          <Typography color="text.primary">{bike.tittle}</Typography>
        </Breadcrumbs>
      </div>

      <div className="product-content">
        <div className="content-header">
          <h1>{bike.tittle}</h1>
          <img
            className="bike-img-cart"
            src={bike.image}
            alt={bike.tittle}
          ></img>
        </div>
        <div className="blump" />
        <div style={{ width: "100%" }}>
          <h2>{bike.description}.</h2>
          <p>
            Sizes:
            {bike.avaibleSizesz.map((x) => (
              <span key={uuidv4()}> {x}, </span>
            ))}
          </p>
          <p className="color-box">
            Colors:
            {bike.avaibleColors.map((x) => (
              <div
                key={uuidv4()}
                className="colors-select-cart"
                style={{ background: `${x}` }}
              ></div>
            ))}
          </p>

          <h4>${bike.price}</h4>
        </div>
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    assortment: state.products.assortment,
  }),
  {}
)(BikeCard);
