import React from "react";
import Bikes from "../Bikes/Bikes";
import Filter from "../Filter/Filter";
import Basket from "../Basket/Basket";
import { connect } from "react-redux";
import "./Shop.scss";

const Shop = () => {

  return (
    <main className="main">
      <div className="content">
        <div className="content-bikes">
          <Filter />
          <div className="main-content">
            <Bikes />
          </div>
        </div>
        <div className="sidebar">
          <Basket />
        </div>
      </div>
    </main>
  );
};

export default connect(
  (state) => ({ assortment: state.products.assortment }),
  {}
)(Shop);
