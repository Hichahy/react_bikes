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
  SELECT_COLOR,
  CLEAN_BASKET,
  FLY_UP_MY_SITE,
  DELETE_CART,
  MOBILE_MODE,
  POST_FIREBASE,
} from "./types";
import { bikes } from "../../data.json";
import firebaseAxios from "../../firebaseAxios";

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
  //usuwanie w cartItems
  const cartItems = getState()
    .products.cartItems.slice()
    .filter((x) => x._id !== bike._id);
  //usuwanie w checkout
  const checkout = getState()
    .products.checkout.slice()
    .filter((x) => x._id !== bike._id);

  dispatch({ type: REMOVE_BIKE, payload: { cartItems, checkout } });
  // localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const cleanBasket = () => (dispatch, getState) => {
  const checkout = (getState().products.checkout = []);
  const cartItems = (getState().products.cartItems = []);
  try {
    dispatch({
      type: CLEAN_BASKET,
      payload: { checkout, cartItems },
    });
  } catch (err) {
    console.log(`err`, err);
  }
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

export const goUp = () => (dispatch) => {
  const goUp = window.scrollTo({ top: 0, behavior: "smooth" });
  try {
    dispatch({
      type: FLY_UP_MY_SITE,
      payload: goUp,
    });
  } catch (err) {
    console.log(`err`, err);
  }
};

export const deleteCart = (bike) => (dispatch) => {
  const indexData = bikes.findIndex((i) => i._id === bike._id);
  if (indexData !== -1) bikes.splice(indexData, 1);
  try {
    dispatch({
      type: DELETE_CART,
      payload: { bikes },
    });
  } catch (err) {
    console.log(`err`, err);
  }
};

export const toggleMobileMode = (mobileMode) => (dispatch) => {
  try {
    dispatch({
      type: MOBILE_MODE,
      payload: { mobileMode},
    });
  } catch (err) {
    console.log(`err`, err);
  }
};

export const sendOrder = (idOrderClient) => (dispatch, getState) => {
  // setIsSubmitting(true);
  const name = getState().products.value.name;
  const city = getState().products.value.city;
  const adress = getState().products.value.adress;
  const email = getState().products.value.email;
  const checkout = getState().products.checkout;
  
  const Data = {
    bikes: {
      checkout: checkout,
    },
    contact: {
      name: name,
      city: city,
      street: adress,
      email: email,
      orderId: idOrderClient,
    },
  };
  firebaseAxios.post("/orders.json", Data).then((response) => {
    console.log(response);
  });
  try {
    dispatch({
      type: POST_FIREBASE,
      payload: { name, city, adress, email },
    });
  } catch (err) {
    console.log(`err`, err);
  }
};
