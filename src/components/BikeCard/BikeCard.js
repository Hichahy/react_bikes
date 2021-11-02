import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import formatCurrency, { AvaibleCurrency } from "../../livehacks";
import { RiShoppingBag2Line } from "react-icons/ri";
import data from "../../data.json";
import "./BikeCard.scss";

const BikeCard = () => {
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
          <Link underline="hover" color="inherit" href="/shop">
            Shop
          </Link>
          <Typography color="text.primary">{bike.tittle}</Typography>
        </Breadcrumbs>
      </div>

      <div className="product-content">
        <div className="content-header">
          <h1>{bike.tittle}</h1>
          <img
            className="animate__animated animate__slideInLeft"
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
              <span> {x}, </span>
            ))}
          </p>
          <p className="color-box">
            Colors:
          {bike.avaibleColors.map((x) => (
               <option
               className="colors-select-cart"
               style={{ background: `${x}` }}
             ></option>
            ))}
          </p>
         
          <h4>{formatCurrency(bike.price)}</h4>
        </div>
      </div>
    </div>
  );
};

export default BikeCard;
