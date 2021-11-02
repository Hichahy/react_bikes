import React, { useEffect } from "react";
import "./Basket.scss";
import { IoIosClose } from "react-icons/io";
import formatCurrency from "../../unitl";
import ButtonSidebar from "../../layout/ButtonSidebar/ButtonSidebar";
import ButtonSidebarCheck from "../../layout/ButtonSidebarCheck/ButtonSidebarCheck";
import { connect } from "react-redux";
import {
  removeBike,
  toggleOpenModal,
  toggleCheckOut,
  basketForm,
} from "../../bikes/duck/index";
import Modal from "../Modal/Modal";

const Basket = (props) => {
  const delay = 0.5;

  const closeFormAnimation = () => {
    document.getElementById("basketForm").className =
      "form-container animate__animated animate__flipOutY";
  };

  //bo po usunieciu zostawał formularz
  const cartItems = props.cartItems;
  const openForm = props.openForm;
  const toggleCheckOut = props.toggleCheckOut;

  useEffect(() => {
    if (cartItems.length === 0 && openForm === true) {
      let timer1 = setTimeout(() => toggleCheckOut(!openForm), delay * 1000);
      toggleCheckOut(timer1);
      closeFormAnimation();
    }
  }, [cartItems, openForm, toggleCheckOut]);

  const handleInput = (e) => {
    props.basketForm({ ...props.value, [e.target.name]: e.target.value }); //name nazwa inputa nie stanu name
  };

  // const createOrder = () => {

  //   const order = {
  //     email: form.email,
  //     name: form.name,
  //     adress: form.adress,
  //     cartItems: props.cartItems,
  //     total: props.cartItems.reduce((a, c) => a + c.price * c.count, 0),
  //   };
  //   props.createOrder(order);
  // };

  const finalizeOrder = (e) => {
    e.preventDefault();
    props.toggleOpenModal();
  };

  const totalCount = props.cartItems.reduce((accumulator, currentValue) => {
    //funkcja akumulująca
    return accumulator + currentValue.count;
  }, 0);

  return (
    <div className="">
      <div className="basket-header">
        {props.cartItems.length === 0 ? (
          <div style={{ padding: "10px" }} className="cart-header">
            You don't have any items.{" "}
          </div>
        ) : (
          <div className="cart-header">Your basket {totalCount}.</div>
        )}
      </div>
      <div className="basket">
        <ul className="basket-item">
          {props.cartItems.map((i) => (
            <li key={i._id}>
              <div className="bike-box animate__animated animate__bounceIn">
                <div className="title-box">
                  <div className="basket-title">{i.tittle}</div>
                  <div>
                    <IoIosClose
                      className="close-btn"
                      onClick={() => props.removeBike(i)}
                    />
                  </div>
                </div>
                <div className="basket-content">
                  <div className="basket-img-box">
                    <img src={i.image} alt={i.tittle}></img>
                  </div>
                  <div className="basket-summary">
                    {formatCurrency(i.price)} x{i.count}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {props.cartItems.length !== 0 && (
        <div className="basket-total">
          <p style={{ fontWeight: "bold" }}>
            Total:{" "}
            {formatCurrency(
              props.cartItems.reduce((a, c) => a + c.price * c.count, 0)
            )}
          </p>
          <div className="basket-btn-box">
            {props.openForm === false && <ButtonSidebar />}
          </div>
        </div>
      )}
      {props.openForm && (
        //Form
        <div
          id="basketForm"
          className="form-container animate__animated animate__flipInY"
        >
          <form onSubmit={finalizeOrder}>
            <ul className="form-box">
              <div className="form__group field">
                <input
                  type="email"
                  className="form__field"
                  placeholder="eamail"
                  name="email"
                  id="email"
                  required
                  onChange={handleInput}
                />
                <label htmlFor="email" className="form__label">
                  Email
                </label>
              </div>
              <div className="form__group field">
                <input
                  type="text"
                  className="form__field"
                  placeholder="name"
                  name="name"
                  id="name"
                  required
                  onChange={handleInput}
                />
                <label htmlFor="name" className="form__label">
                  Name
                </label>
              </div>
              <div className="form__group field">
                <input
                  type="text"
                  className="form__field"
                  placeholder="adress"
                  name="adress"
                  id="adress"
                  required
                  onChange={handleInput}
                />
                <label htmlFor="adress" className="form__label">
                  Adress
                </label>
              </div>
            </ul>
            <ButtonSidebarCheck />
          </form>
        </div>
      )}
      <Modal />
    </div>
  );
};

export default connect(
  (state) => ({
    cartItems: state.products.cartItems,
    openModal: state.products.openModal,
    openForm: state.products.openForm,
    value: state.products.value,
  }),
  { removeBike, toggleOpenModal, toggleCheckOut, basketForm }
)(Basket);
