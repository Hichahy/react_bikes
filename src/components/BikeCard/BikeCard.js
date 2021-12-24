/* eslint-disable react/prop-types */
import './BikeCard.scss'
import { Breadcrumbs, Typography } from '@mui/material'
import { NavLink, useParams } from 'react-router-dom'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import data from '../../data.json'
import { v4 as uuidv4 } from 'uuid'

const BikeCard = ({ assortment }) => {
  const [bikes] = useState(data.bikes)

  const { id } = useParams()

  const find = () => {
    return bikes.find((x) => x._id === id)
  }
  const bike = find(id)

  return (
    <div className="product-containter ">
      <div style={{ position: 'sticky', top: '10%', zIndex: '3' }}>
        <Breadcrumbs aria-label="breadcrumb">
          <NavLink className="breadcrumbs_link" to="/shop">
            Shop
          </NavLink>
          <Typography color="text.primary">{bike.tittle}</Typography>
        </Breadcrumbs>
      </div>

      <div className="product-content">
        <div className="content-header">
          <h1>{bike.tittle}</h1>
          <img
            className="bike-img-cart"
            src={bike.image}
            alt={bike.tittle}
          ></img>
        </div>
        <div className="blump" />
        <div style={{ width: '100%', zIndex: '2' }}>
          <h2>{bike.description}.</h2>
          <p>
            Sizes:
            {bike.avaibleSizesz.map((x) => (
              <span key={uuidv4()}> {x}, </span>
            ))}
          </p>
          <div className="color-box">
            <p>Colors:</p>
            {bike.avaibleColors.map((x) => (
              <div
                key={uuidv4()}
                className="colors-select-cart"
                style={{ background: `${x}` }}
              ></div>
            ))}
          </div>
          <h4>${bike.price}</h4>
        </div>
      </div>
    </div>
  )
}

export default connect(
  (state) => ({
    assortment: state.products.assortment
  }),
  {}
)(BikeCard)
