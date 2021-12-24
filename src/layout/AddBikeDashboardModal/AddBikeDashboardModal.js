/* eslint-disable react/prop-types */
import './AddBikeDashboardModal.scss'
import { Box, Button, Modal } from '@mui/material'
import React from 'react'
// import { AiOutlineClose } from "react-icons/ai";

const AddBikeDashboardModal = ({
  open,
  closeModal,
  handleAddBike,
  addBikeForm,
  succesAdd,
  avaibleColors,
  avaibleSizesz
}) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    p: 3
  }

  const box = {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-evenly',
    marginTop: '10px'
  }

  return (
    <Modal
      open={open}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h1 className="h1-addB">The appearance of your card:</h1>
        <div className="cart-section">
          <div className="cart-add">
            <div className="tittle-box">
              <h4 className="tittle">{addBikeForm.tittle}</h4>
            </div>

            <div className="image-box">
              <img src={addBikeForm.image} alt={addBikeForm.tittle}></img>
            </div>

            <div className="description-box">
              <p>{addBikeForm.description}</p>
              <div className="size_box">
                <label>Sizes:</label>
                {avaibleSizesz.map((size, index) => (
                  <div key={index} className="option">
                    <input id={size} type="radio" />
                    <p>{size},</p>
                  </div>
                ))}
              </div>
              <div className="color-box">
                <label>Colors:</label>
                {avaibleColors.map((color, index) => (
                  <li style={{ listStyle: 'none' }} key={index}>
                    <div
                      className="colors-select"
                      style={{ background: `${color}` }}
                    ></div>
                  </li>
                ))}
              </div>
            </div>
            <div className="price-box">
              <h4>${addBikeForm.price}</h4>
            </div>
          </div>
        </div>
        <Box sx={box}>
          <Button
            onClick={handleAddBike}
            variant="contained"
            href="#contained-buttons"
          >
            Add Product
          </Button>
          <Button
            onClick={closeModal}
            variant="contained"
            href="#contained-buttons"
          >
            Back
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default AddBikeDashboardModal
