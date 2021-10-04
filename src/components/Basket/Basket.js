import React, { useState, useEffect } from "react";
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

  //bo po usunieciu zostawał formularz 
  useEffect(() => {
    if (props.basketItems.length === 0 ) {
      setShowCheckout(false)
    }
  }, [props.basketItems])

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
              <div className="bike-box animate__animated animate__bounceIn">
                <div className="title-box">
                  <div className="basket-title">{i.tittle}</div>
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
        <div className="form-container animate__animated animate__flipInY">
          <form onSubmit={createOrder}>
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
    </div>
  );
};

export default Basket;
