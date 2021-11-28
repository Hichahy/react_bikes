import React from "react";
import { Modal, Box, Button } from "@mui/material";
import "./AddBikeDashboardModal.scss";
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
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
  };

  // const style2 = {
  //   position: "absolute",
  //   top: "50%",
  //   left: "50%",
  //   transform: "translate(-50%, -50%)",
  //   width: "50%",
  //   bgcolor: "background.paper",
  //   boxShadow: 24,
  //   p: 3,
  //   height: "50%",
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  // };

  const box = {
    display: "flex",
    width: "100%",
    justifyContent: "space-evenly",
    marginTop: "10px",
  };

  return (
    <Modal
      open={open}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {/* {!succesAdd ? ( */}
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
                    <li style={{ listStyle: "none" }} key={index}>
                      <option
                        className="colors-select"
                        style={{ background: `${color}` }}
                      ></option>
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
      {/* // ) : (
      //   <Box sx={style2}>
      //     <AiOutlineClose className="x-dash" onClick={closeModal} />
      //     <img
      //       className="background-img"
      //       src="Images/add-bike.png"
      //       alt="cyclist"
      //     />
      //     <h1>Great! Your product is addtion to Shop section.</h1>
      //   </Box>
      // )} */}
    </Modal>
  );
};

export default AddBikeDashboardModal;
