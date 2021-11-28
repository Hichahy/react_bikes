import React, { useState } from "react";
import ReactDom from "react-dom";
import "./Modal.scss";
import { toggleOpenModal, cleanBasket } from "../../bikes/duck/index";
import { connect } from "react-redux";
// import formatCurrency, { AvaibleCurrency } from "../../livehacks";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineClose } from "react-icons/ai";
import Bloop from "../../layout/Bloop/Bloop";
import ButtonPurchase from "../../layout/ButtonPurchase/ButtonPurchase";
import firebaseAxios from "../../firebaseAxios";

const Modal = ({
  checkout,
  openModal,
  toggleOpenModal,
  value,
  cartItems,
  cleanBasket,
  idOrderClient,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const postData = () => {
    setIsSubmitting(true);
    const Data = {
      bikes: {
        checkout,
      },
      contact: {
        name: value.name,
        city: value.city,
        street: value.adress,
        email: value.email,
        orderId: idOrderClient,
      },
    };
    firebaseAxios.post("/orders.json", Data).then((response) => {
      console.log(response);
    });
    cleanBasket();
  };

  if (!openModal) return null;

  return ReactDom.createPortal(
    <>
      <div
        className="overlay"
        onClick={() => {
          toggleOpenModal(openModal);
          setIsSubmitting(false);
        }}
      />
      <div className="modal">
        <AiOutlineClose
          className="x-modal"
          onClick={() => {
            toggleOpenModal(openModal);
            setIsSubmitting(false);
          }}
        />
        {isSubmitting ? (
          <div>
            <h1>Excellently! your order is now ready to be shipped.</h1>
            <h4>Your order Id: {idOrderClient}</h4>
          </div>
        ) : (
          <>
            <p>Great! {value.name}, now you must checkout your order ...</p>
            <div className="info_tittle">
              <h6>Your order:</h6>
              <h6>Contact data:</h6>
            </div>
            <div className="info_container">
              <ol className="label_container">
                {checkout.map((i) => (
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
                      
                        <option
                          className="color-select-modal"
                          style={{ background: `${i.selectedColor}` }}
                        ></option>
                      </div>
                      <label className="siezeP">${i.price}</label>
                    </div>
                  </div>
                ))}
              </ol>
              <div className="contact_data_box">
                <ul>
                  <li>
                    <label>Name: </label>
                    {value.name}
                  </li>
                  <li>
                    <label>Email: </label>
                    {value.email}
                  </li>
                  <li>
                    <label>Adress: </label>
                    {value.adress}
                  </li>
                  <li>
                    <label>City: </label>
                    {value.city}
                  </li>
                </ul>
              </div>
            </div>

            <div className="summary-box">
              <p className="totalP">
                Total: ${" "}
                {cartItems
                  .reduce((a, c) => a + c.price * c.count, 0)
                  .toFixed(2)}
              </p>
              <ButtonPurchase postData={postData}>Purhase</ButtonPurchase>
            </div>
          </>
        )}
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
  { toggleOpenModal, cleanBasket }
)(Modal);
