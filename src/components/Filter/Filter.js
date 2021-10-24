import React from "react";
import "./Filter.scss";
import { BiSearchAlt } from "react-icons/bi";
import { connect } from "react-redux";
import {
  filterBySize,
  filterByVarious,
  filterBySearch,
} from "../../bikes/duck/index";

const Filter = (props) => {
  const assortment = props.assortment;

  return (
    <div className="filter-container">
      <div className="filter-count">
        <span>Available bikes: {props.filteredItems.length}</span>
      </div>
      <div className="filter-search">
        <BiSearchAlt />
        <input
          className="input_search"
          value={props.letters}
          type="text"
          placeholder="Find bike..."
          autoComplete="off"
          onChange={(e) => props.filterBySearch(assortment, e.target.value)}
        />
      </div>
      <div className="filter-sort">
        <span>Sort by:</span>
        <select
          className="sort-select"
          value={props.sort}
          onChange={(e) => props.filterByVarious(assortment, e.target.value)}
        >
          <option value="none">--</option>
          <option>Latest</option>
          <option value="alphabet">A-Z</option>
          <option value="highest">Highest price</option>
          <option value="lowest">Lowest price</option>
        </select>
      </div>
      <div className="filter-size">
        <span>Filter:</span>
        <select
          className="size-select"
          value={props.size}
          onChange={(e) => props.filterBySize(assortment, e.target.value)}
        >
          <option value="">All bikes</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    size: state.products.size,
    sort: state.products.sort,
    letters: state.products.letters,
    assortment: state.products.assortment,
    filtered: state.products.filtered,
    filteredItems: state.products.filteredItems,
  }),
  {
    filterBySize,
    filterByVarious,
    filterBySearch,
  }
)(Filter);
