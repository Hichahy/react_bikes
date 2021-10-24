import bikeReducer from "./reducers";
export {
  LOAD_BIKES,
  ADD_BIKE,
  REMOVE_BIKE,
  FILTER_PRODUCTS_BY_SIZE,
  FILTER_PRODUCTS_BY_VARIOUS,
  FILTER_PRODUCTS_BY_SEARCH,
  SHOW_CHECKOUT,
  MODAL,
  BASKET_FORM,
  SELECT_SIZE,
  ADD_CHECKOUT,
  SELECT_COLOR
} from "./types";
export {
  loadBike,
  addBike,
  removeBike,
  filterBySize,
  filterByVarious,
  filterBySearch,
  toggleOpenModal,
  toggleCheckOut,
  basketForm,
  selectSize,
  selectColor,
  addToCheckout
} from "./actions";
export default bikeReducer;