import React from "react";
import "./Basket.scss";
import { IoIosClose } from "react-icons/io";
import formatCurrency from "../../livehacks";
import ButtonSidebar from "../../layout/ButtonSidebar/ButtonSidebar";

const Basket = (props) => {
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
            <ButtonSidebar />
          </div>
        </div>
      )}
    </div>
  );
};

export default Basket;
