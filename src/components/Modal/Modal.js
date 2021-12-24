import './Modal.scss'
import React, { useState } from 'react'
import {
  cleanBasket,
  sendOrder,
  toggleOpenModal
} from '../../bikes/duck/index'
import { AiOutlineClose } from 'react-icons/ai'
import Bloop from '../../layout/Bloop/Bloop'
import ButtonPurchase from '../../layout/ButtonPurchase/ButtonPurchase'
import ReactDom from 'react-dom'
import { connect } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

const Modal = ({
  checkout,
  openModal,
  toggleOpenModal,
  value,
  cartItems,
  cleanBasket,
  idOrderClient,
  sendOrder
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const postData = () => {
    setIsSubmitting(true)
    sendOrder(idOrderClient)
    cleanBasket()
  }

  if (!openModal) return null

  return ReactDom.createPortal(
    <>
      <div
        className="overlay"
        onClick={() => {
          toggleOpenModal(openModal)
          setIsSubmitting(false)
        }}
      />
      <div className="modal">
        <div className="x-box">
          <AiOutlineClose
            className="x-modal"
            onClick={() => {
              toggleOpenModal(openModal)
              setIsSubmitting(false)
            }}
          />
        </div>
        {isSubmitting
          ? (
          <div className="succes-box">
            <h1>Excellently! your order is now ready to be shipped.</h1>
            <h4>Your order Id: {idOrderClient}</h4>
          </div>
            )
          : (
          <>
            <p>Great! {value.name}, now you must checkout your order ...</p>
            <div className="info-tittle">
              <h6>Your order:</h6>
              <h6>Contact data:</h6>
            </div>
            <div className="info-container">
              <ol className="label-container">
                {checkout.map((i) => (
                  <div key={uuidv4()} className="label-box">
                    <div className="label-info">
                      <li style={{ fontWeight: '600' }}>
                        <label>{i.tittle} </label>
                      </li>
                      <div>
                        <label>Size: </label>
                        <p className="sieze-p">{i.selectedSize}</p>
                      </div>
                      <div>
                        <label>Color: </label>
                        <div
                          className="color-select-modal"
                          style={{ background: `${i.selectedColor}` }}
                        ></div>
                      </div>
                      <label className="sieze-p">${i.price}</label>
                    </div>
                  </div>
                ))}
              </ol>
              <div className="contact-data-box">
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
              <p className="total-p">
                Total: ${' '}
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
    document.getElementById('portal')
  )
}
export default connect(
  (state) => ({
    openModal: state.products.openModal,
    value: state.products.value,
    cartItems: state.products.cartItems,
    checkout: state.products.checkout
  }),
  { toggleOpenModal, cleanBasket, sendOrder }
)(Modal)
