import React, { useState } from "react";
import "./Basket.scss";
import { IoIosClose } from "react-icons/io";
import formatCurrency from "../../livehacks";
import ButtonSidebar from "../../layout/ButtonSidebar/ButtonSidebar";
import ButtonSidebarCheck from "../../layout/ButtonSidebarCheck/ButtonSidebarCheck";

const Basket = (props) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    adress: "",
  });

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value }); //name nazwa inputa nie stanu name
  };

  const createOrder = (e) => {
    e.preventDefault();
    const order = {
      email: form.email,
      name: form.name,
      adress: form.adress,
      basketItems: props.basketItems,
    };
    props.createOrder(order);
  };

  return (
    <div>
      <div className="basket-header">
        {props.basketItems.length === 0 ? (
          <div className="cart cart-header">You don't have any items.</div>
        ) : (
          <div className="cart cart-header">
            Your basket {props.basketItems.length}.
          </div>
        )}
      </div>
      <div className="basket">
        <ul className="basket-item">
          {props.basketItems.map((i) => (
            <li key={i._id}>
              <div className="bike-box">
                <div className="title-box">
                  <div>{i.tittle}</div>
                  <div>
                    <IoIosClose
                      className="close-btn"
                      onClick={() => props.removeFromBasket(i)}
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
      {props.basketItems.length !== 0 && (
        <div className="basket-total">
          <p style={{ fontWeight: "bold" }}>
            Total:{" "}
            {formatCurrency(
              props.basketItems.reduce((a, c) => a + c.price * c.count, 0)
            )}
          </p>
          <div className="basket-btn-box">
            {showCheckout === false && (
              <ButtonSidebar setShowCheckout={setShowCheckout} />
            )}
          </div>
        </div>
      )}
      {showCheckout && (
        //Form
        <div className="form-container">
          <form onSubmit={createOrder}>
            <ul className="form-box">
              <div class="form__group field">
                <input
                  type="email"
                  className="form__field"
                  placeholder="eamail"
                  name="email"
                  id="email"
                  required
                  onChange={handleInput}
                />
                <label for="email" class="form__label">
                  Email
                </label>
              </div>
              <div class="form__group field">
                <input
                  type="text"
                  className="form__field"
                  placeholder="name"
                  name="name"
                  id="name"
                  required
                  onChange={handleInput}
                />
                <label for="name" class="form__label">
                  Name
                </label>
              </div>
              <div class="form__group field">
                <input
                  type="text"
                  className="form__field"
                  placeholder="adress"
                  name="adress"
                  id="adress"
                  required
                  onChange={handleInput}
                />
                <label for="adress" class="form__label">
                  Adress
                </label>
              </div>
            </ul>
            <ButtonSidebarCheck />
          </form>
        </div>
      )}
    </div>
  );
};

export default Basket;
