import {
  ADD_BIKE,
  LOAD_BIKES,
  REMOVE_BIKE,
  FILTER_PRODUCTS_BY_SIZE,
  FILTER_PRODUCTS_BY_VARIOUS,
  FILTER_PRODUCTS_BY_SEARCH,
  MODAL,
  SHOW_CHECKOUT,
  BASKET_FORM,
  SELECT_SIZE,
  ADD_CHECKOUT,
  SELECT_COLOR
} from "./types";
import { bikes } from "../../data.json";

export const loadBike = () => (dispatch) => {
  dispatch({
    type: LOAD_BIKES,
    payload: bikes,
  });
};

export const addBike = (bike) => (dispatch, getState) => {
  const cartItems = getState().products.cartItems.slice();
  let alreadyExists = false;
  cartItems.forEach((x) => {
    if (x._id === bike._id) {
      alreadyExists = true;
      x.count++;
    }
  });
  if (!alreadyExists) {
    cartItems.push({ ...bike, count: 1 });
  }
  dispatch({
    type: ADD_BIKE,
    payload: { cartItems },
  });
  // localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const removeBike = (bike) => (dispatch, getState) => {
  const cartItems = getState()
    .products.cartItems.slice()
    .filter((x) => x._id !== bike._id);
  dispatch({ type: REMOVE_BIKE, payload: { cartItems } });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const filterBySize = (products, size) => (dispatch) => {
  return dispatch({
    type: FILTER_PRODUCTS_BY_SIZE,
    payload: {
      size: size,
      items:
        size === ""
          ? products
          : products.filter((x) => x.avaibleSizesz.indexOf(size) >= 0),
    },
  });
};

export const filterByVarious = (filteredProducts, sort) => (dispatch) => {
  const filtered = filteredProducts.slice();
  if (sort === "latest") {
    filtered.sort((a, b) => (a._id > b._id ? 1 : -1));
  } else {
    filtered.sort((a, b) =>
      sort === "lowest"
        ? a.price > b.price
          ? 1
          : -1
        : sort === "highest"
        ? a.price < b.price
          ? 1
          : -1
        : sort === "alphabet"
        ? a.tittle < b.tittle
          ? -1
          : 1
        : a._id < b._id
        ? 1
        : -1
    );
  }
  dispatch({
    type: FILTER_PRODUCTS_BY_VARIOUS,
    payload: {
      sort: sort,
      items: filtered,
    },
  });
};

export const filterBySearch = (filtered, letters) => (dispatch) => {
  dispatch({
    type: FILTER_PRODUCTS_BY_SEARCH,
    payload: {
      letters: letters,
      items:
        letters === ""
          ? filtered
          : filtered.filter((i) =>
              i.tittle.toLowerCase().includes(letters.toLowerCase())
            ),
    },
  });
};

export const toggleOpenModal = (openModal) => (dispatch) => {
  try {
    dispatch({
      type: MODAL,
      payload: { openModal: !openModal },
    });
  } catch (err) {
    console.log(`err`, err);
  }
};

export const toggleCheckOut = (openForm) => (dispatch) => {
  try {
    dispatch({
      type: SHOW_CHECKOUT,
      payload: { openForm: openForm },
    });
  } catch (err) {
    console.log(`err`, err);
  }
};

export const basketForm = (value) => (dispatch) => {
  try {
    dispatch({
      type: BASKET_FORM,
      payload: {
        value: value,
      },
    });
  } catch (err) {
    console.log(`err`, err);
  }
};

export const selectSize = (valueSelect, bikeId) => (dispatch) => {
  try {
    dispatch({
      type: SELECT_SIZE,
      payload: { valueSelect, bikeId },
    });
  } catch (err) {
    console.log(`err`, err);
  }
};

export const selectColor = (valueColor, bikeId) => (dispatch) => {
  try {
    dispatch({
      type: SELECT_COLOR,
      payload: { valueColor, bikeId },
    });
  } catch (err) {
    console.log(`err`, err);
  }
};

export const addToCheckout = (orderedBike) => (dispatch) => {
  try {
    dispatch({
      type: ADD_CHECKOUT,
      payload: orderedBike,
    });
  } catch (err) {
    console.log(`err`, err);
  }
};