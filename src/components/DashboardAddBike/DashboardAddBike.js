import React, { useState, useEffect } from "react";
import "./DashboardAddBike.scss";
import { AiOutlineClose } from "react-icons/ai";
import { connect } from "react-redux";
import { bikes } from "../../data.json";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import AddBikeDashboardModal from "../../layout/AddBikeDashboardModal/AddBikeDashboardModal";

const DashboardAddBike = ({ showAddBikeHandler, assortment }) => {
  const [errorsAddBike, setErrorsAddBike] = useState({});
  const [succesAdd, setSuccesAdd] = useState(false);
  const [open, setOpen] = useState(false);
  const [avaibleColors, setAvaibleColors] = useState([]);
  const [avaibleSizesz, setAvaibleSizesz] = useState([]);
  const [addBikeForm, setAddBikeForm] = useState({
    tittle: "",
    image: "",
    description: "",
    avaibleColors: [],
    avaibleSizesz: [],
    count: 0,
    selectedSize: "",
    selectedColor: "",
    // _id: "bike" + (bikes.length + 1),
    _id: uuidv4(),
    price: 0,
  });

  const [sizes, setSizes] = useState({
    size1: "",
    size2: "",
    size3: "",
    size4: "",
  });

  const [colors, setColors] = useState({
    color1: "",
    color2: "",
    color3: "",
  });

  const [size1, setSize1] = useState(false);
  const [size2, setSize2] = useState(false);
  const [size3, setSize3] = useState(false);
  const [size4, setSize4] = useState(false);

  const [submitAddBike, setSubmitAddBike] = useState(false);

  const history = useHistory();

  //validate
  const validateInfo = () => {
    let errors = {};
    if (!addBikeForm.tittle.trim()) {
      errors.tittle = "Title required";
    } else if (!/^[A-Za-z]+/.test(addBikeForm.tittle.trim())) {
      errors.tittle = "Enter a valid tittle";
    } else if (addBikeForm.tittle.length > 30) {
      errors.tittle = "Title is to long";
    }

    if (addBikeForm.image.substring(0, 8) !== "https://") {
      errors.image = "Image Invalid";
    }

    if (!addBikeForm.description.trim()) {
      errors.description = "Description required";
    } else if (!/^[A-Za-z]+/.test(addBikeForm.description.trim())) {
      errors.description = "Enter a valid Description";
    } else if (addBikeForm.description.length > 100) {
      errors.description = "Description is to long";
    }

    if (!size1 && !size2 && !size3 && !size4) {
      errors.sizes = "Add least one size";
    }

    if (!colors.color1 && !colors.color2 && !colors.color3) {
      errors.colors = "Add least one color";
    } else if (colors.color1.charAt(0) !== "#" && colors.color1 !== "") {
      errors.colors = "Invalid color";
    } else if (colors.color2.charAt(0) !== "#" && colors.color2 !== "") {
      errors.colors = "Invalid color";
    } else if (colors.color3.charAt(0) !== "#" && colors.color3 !== "") {
      errors.colors = "Invalid color";
    }

    if (addBikeForm.price === 0 || addBikeForm.price < 0) {
      errors.price = "Invalid price";
    }

    return errors;
  };

  const handleAddBike = () => {
    addBikeForm.avaibleColors.push(...avaibleColors);
    addBikeForm.avaibleSizesz.push(...avaibleSizesz);
    bikes.push(addBikeForm);
    setSuccesAdd(true);
    history.push(`bike/${addBikeForm._id}`);
  };

  const handleOpenModal = (e) => {
    e.preventDefault();
    setSuccesAdd(false);
    setAvaibleColors(
      [colors.color1, colors.color2, colors.color3].filter((i) => i)
    );
    setAvaibleSizesz(
      [sizes.size1, sizes.size2, sizes.size3, sizes.size4].filter((i) => i)
    );
    setErrorsAddBike(validateInfo(addBikeForm));
    setSubmitAddBike(true);
  };

  const closeModal = () => {
    setOpen(false);
    setSubmitAddBike(false);
  };

  useEffect(() => {
    if (Object.keys(errorsAddBike).length === 0 && submitAddBike) {
      setOpen(true);
    }
  }, [submitAddBike, errorsAddBike]);

  const handleInput = (e) => {
    setAddBikeForm({ ...addBikeForm, [e.target.name]: e.target.value });
    setSizes({ ...sizes, [e.target.name]: e.target.value });
    setColors({ ...colors, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="AddBike-dashboard">
        <AiOutlineClose className="x-dash" onClick={showAddBikeHandler} />
        <h1>Add bike to your shop</h1>
        <div className="box-addBike">
          <div className="bikeCart-dashboard">
            <form onSubmit={handleOpenModal} className="addBike-form">
              <label>Title</label>
              {errorsAddBike.tittle && (
                <label className="error_register">{errorsAddBike.tittle}</label>
              )}
              <input
                className="input-text"
                type="text"
                name="tittle"
                value={addBikeForm.tittle}
                onChange={handleInput}
              ></input>

              <label>Link to photo png.</label>
              {errorsAddBike.image && (
                <label className="error_register">{errorsAddBike.image}</label>
              )}
              <input
                className="input-text"
                type="text"
                name="image"
                value={addBikeForm.image}
                onChange={handleInput}
              ></input>
              <label>Description</label>
              {errorsAddBike.description && (
                <label className="error_register">
                  {errorsAddBike.description}
                </label>
              )}
              <input
                className="input-text"
                type="text"
                name="description"
                value={addBikeForm.description}
                onChange={handleInput}
              ></input>
              <label>Sizes</label>
              {errorsAddBike.sizes && (
                <label className="error_register">{errorsAddBike.sizes}</label>
              )}
              <div className="addBike-siezes">
                <label>
                  XL
                  <input
                    name="size1"
                    type="checkbox"
                    checked={size1}
                    value={`${size1 === false ? "XL" : null}`}
                    onChange={handleInput}
                    onClick={() => setSize1(!size1)}
                  />
                </label>

                <label>
                  L
                  <input
                    name="size2"
                    type="checkbox"
                    value={`${size2 === false ? "L" : null}`}
                    onChange={handleInput}
                    onClick={() => setSize2(!size2)}
                  />
                </label>

                <label>
                  M
                  <input
                    name="size3"
                    type="checkbox"
                    value={`${size3 === false ? "M" : null}`}
                    onChange={handleInput}
                    onClick={() => setSize3(!size3)}
                  />
                </label>

                <label>
                  S
                  <input
                    name="size4"
                    type="checkbox"
                    value={`${size4 === false ? "S" : null}`}
                    onChange={handleInput}
                    onClick={() => setSize4(!size4)}
                  />
                </label>
              </div>
              <label>Color Hex</label>
              {errorsAddBike.colors && (
                <label className="error_register">{errorsAddBike.colors}</label>
              )}
              <div className="addBike-siezes">
                <input
                  className="color-input"
                  type="text"
                  placeholder="color 1"
                  name="color1"
                  value={colors.color1}
                  onChange={handleInput}
                />
                <input
                  className="color-input"
                  type="text"
                  name="color2"
                  placeholder="color 2"
                  value={colors.color2}
                  onChange={handleInput}
                />
                <input
                  className="color-input"
                  type="text"
                  placeholder="color 3"
                  name="color3"
                  value={colors.color3}
                  onChange={handleInput}
                />
              </div>

              <label>Price</label>
              {errorsAddBike.price && (
                <label className="error_register">{errorsAddBike.price}</label>
              )}
              <input
                className="input-text"
                type="number"
                name="price"
                value={addBikeForm.price}
                onChange={handleInput}
              ></input>
              <button type="submit" className="addBike-btn">
                Add
              </button>
            </form>
          </div>
        </div>
        <AddBikeDashboardModal
          open={open}
          closeModal={closeModal}
          handleAddBike={handleAddBike}
          addBikeForm={addBikeForm}
          avaibleColors={avaibleColors}
          avaibleSizesz={avaibleSizesz}
          succesAdd={succesAdd}
        />
      </div>
    </>
  );
};
export default connect(
  (state) => ({
    assortment: state.products.assortment,
  }),
  {}
)(DashboardAddBike);
