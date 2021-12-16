import React, { useState } from "react";
import Bikes from "../Bikes/Bikes";
import Filter from "../Filter/Filter";
import Basket from "../Basket/Basket";
import { connect } from "react-redux";
import { deleteCart, loadBike } from "../../bikes/duck/index";
import ModalBikeDeleteCart from "../../layout/ModalBikeDeleteCart/ModalBikeDeleteCart";
import "./Shop.scss";
import { bikes } from "../../data.json";

const Shop = ({ deleteCart,loadBike, mobileMode }) => {
  const [open, setOpen] = useState(false);
  const [idDel, setIdDel] = useState();

  const handleOpenModal = (bike) => {
    setOpen(!open);
    setIdDel(bike);
  };

  const handleDelCart = () => {
    deleteCart(idDel);
    loadBike()
    setOpen(!open);
    console.log(`bikes`, bikes);
  };
  console.log(`bikes`, bikes);

  return (
    <main className="main">
      <div className="content">
        <div className="content-bikes">
          <Filter />
          <div className="main-content">
            <Bikes handleOpenModal={handleOpenModal} setIdDel={setIdDel} />
          </div>
        </div>
        <div className="sidebar">
          <Basket />
        </div>
        <ModalBikeDeleteCart
          open={open}
          handleOpenModal={handleOpenModal}
          handleDelCart={handleDelCart}
        />
      </div>
      
    </main>
  );
};

export default connect((state) => ({}), {
  deleteCart, loadBike
})(Shop);
