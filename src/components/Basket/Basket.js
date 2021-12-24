/* eslint-disable react/prop-types */
import './Basket.scss'
import { Breadcrumbs, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {
  basketForm,
  removeBike,
  toggleCheckOut,
  toggleOpenModal
} from '../../bikes/duck/index'
import ButtonSidebar from '../../layout/ButtonSidebar/ButtonSidebar'
import ButtonSidebarCheck from '../../layout/ButtonSidebarCheck/ButtonSidebarCheck'
import { IoIosClose } from 'react-icons/io'
import Modal from '../Modal/Modal'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

const Basket = ({
  cartItems,
  openForm,
  toggleCheckOut,
  basketForm,
  value,
  toggleOpenModal,
  removeBike
}) => {
  const [idOrderClient, setIdOrderClient] = useState()

  const delay = 0.5

  const closeFormAnimation = () => {
    document.getElementById('basketForm').className =
      'form-container animate__animated animate__flipOutY'
  }

  // bo po usunieciu zostawał formularz
  useEffect(() => {
    if (cartItems.length === 0 && openForm === true) {
      const timer1 = setTimeout(() => toggleCheckOut(!openForm), delay * 1000)
      toggleCheckOut(timer1)
      closeFormAnimation()
    }
  }, [cartItems, openForm, toggleCheckOut])

  const handleInput = (e) => {
    basketForm({ ...value, [e.target.name]: e.target.value }) // name nazwa inputa nie stanu name
  }

  const finalizeOrder = (e) => {
    e.preventDefault()
    toggleOpenModal()
    setIdOrderClient(uuidv4())
  }

  // funkcja akumulująca
  const totalCount = cartItems.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.count
  }, 0)

  return (
    <div className="basket-container">
      <div className="breadcrumbs-basket">
        <Breadcrumbs aria-label="breadcrumb">
          <NavLink className="breadcrumbs_link" to="/shop">
            Shop
          </NavLink>
          <Typography color="text.primary">basket</Typography>
        </Breadcrumbs>
      </div>
      <div className="basket-header">
        {cartItems.length === 0
          ? (
          <label style={{ padding: '10px' }} className="cart-header">
            You don&apos;t have any items.{' '}
          </label>
            )
          : (
          <label className="cart-header">Your basket {totalCount}.</label>
            )}
      </div>
      <div className="basket">
        <ul className="basket-item">
          {cartItems.map((i) => (
            <li key={i._id}>
              <div className="bike-box animate__animated animate__bounceIn">
                <div className="title-box">
                  <div className="basket-title">{i.tittle}</div>
                  <div>
                    <IoIosClose
                      className="close-btn"
                      onClick={() => removeBike(i)}
                    />
                  </div>
                </div>
                <div className="basket-content">
                  <div className="basket-img-box">
                    <img src={i.image} alt={i.tittle}></img>
                  </div>
                  <div className="basket-summary">
                    ${i.price} x{i.count}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {cartItems.length !== 0 && (
        <div className="basket-total">
          <p>
            Total: $
            {cartItems.reduce((a, c) => a + c.price * c.count, 0).toFixed(2)}
          </p>
          <div className="basket-btn-box">
            {openForm === false && <ButtonSidebar />}
          </div>
        </div>
      )}
      {openForm && (
        // Form
        <div
          id="basketForm"
          className="form-container animate__animated animate__flipInY"
        >
          <form onSubmit={finalizeOrder}>
            <ul className="form-box">
              <div className="form-group field">
                <input
                  type="email"
                  className="form-field"
                  placeholder="eamail"
                  name="email"
                  id="email"
                  required
                  onChange={handleInput}
                />
                <label htmlFor="email" className="form-label">
                  Email
                </label>
              </div>
              <div className="form-group field">
                <input
                  type="text"
                  className="form-field"
                  placeholder="name"
                  name="name"
                  id="name"
                  required
                  onChange={handleInput}
                />
                <label htmlFor="name" className="form-label">
                  Name
                </label>
              </div>
              <div className="form-group field">
                <input
                  type="text"
                  className="form-field"
                  placeholder="adress"
                  name="adress"
                  id="adress"
                  required
                  onChange={handleInput}
                />
                <label htmlFor="adress" className="form-label">
                  Adress
                </label>
              </div>
              <div className="form-group field">
                <input
                  type="text"
                  className="form-field"
                  placeholder="city"
                  name="city"
                  id="city"
                  required
                  onChange={handleInput}
                />
                <label htmlFor="city" className="form-label">
                  City
                </label>
              </div>
            </ul>
            <ButtonSidebarCheck />
          </form>
        </div>
      )}
      <Modal idOrderClient={idOrderClient} />
    </div>
  )
}

export default connect(
  (state) => ({
    cartItems: state.products.cartItems,
    openModal: state.products.openModal,
    openForm: state.products.openForm,
    value: state.products.value,
    mobileMode: state.products.mobileMode
  }),
  { removeBike, toggleOpenModal, toggleCheckOut, basketForm }
)(Basket)
