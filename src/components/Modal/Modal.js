import React from "react";
import ReactDom from "react-dom";
import "./Modal.scss";
import { toggleOpenModal } from "../../bikes/duck/index";
import { connect } from "react-redux";
import formatCurrency, { AvaibleCurrency } from "../../livehacks";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineClose } from "react-icons/ai";
import Bloop from "../../layout/Bloop/Bloop";
import ButtonPurchase from "../../layout/ButtonPurchase/ButtonPurchase";
import { typographyClasses } from "@mui/material";

const Modal = (props) => {
  if (!props.openModal) return null;

  return ReactDom.createPortal(
    <>
      <div
        className="overlay"
        onClick={() => props.toggleOpenModal(props.openModal)}
      />
      <div className="modal">
        <AiOutlineClose
          className="x-modal"
          onClick={() => props.toggleOpenModal(props.openModal)}
        />

        <p>Great! {props.value.name}, now you must checkout your order ...</p>
        <p style={{ fontSize: "18px", fontWeight: "600" }}>Your order:</p>
        <ol className="label_container">
          {props.checkout.map((i) => (
            <div key={uuidv4()} className="label_box">
              <div className="label_info">
                <li style={{ fontWeight: "600" }}>
                  <label>{i.tittle} </label>
                </li>
                <div>
                  <label>Size: </label>
                  <p className="siezeP">{i.selectedSize}</p>
                </div>
                <div>
                  <label>Color: </label>
                  <p className="siezeP">{i.selectedColor}</p>
                  <option
                    className="color-select-modal"
                    style={{ background: `${i.selectedColor}` }}
                  ></option>
                </div>
                <label className="siezeP">{formatCurrency(i.price)}</label>
              </div>
            </div>
          ))}
        </ol>
        <div className="summary-box">
          <p className="totalP">
            Total:{" "}
            {formatCurrency(
              props.cartItems.reduce((a, c) => a + c.price * c.count, 0)
            )}
          </p>
          <ButtonPurchase />
        </div>
        <Bloop />
      </div>
    </>,
    document.getElementById("portal")
  );
};
export default connect(
  (state) => ({
    openModal: state.products.openModal,
    value: state.products.value,
    cartItems: state.products.cartItems,
    checkout: state.products.checkout,
  }),
  { toggleOpenModal }
)(Modal);
