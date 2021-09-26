import React from "react";
import "./Filter.scss";
import { BiSearchAlt } from "react-icons/bi";

const Filter = (props) => {
  return (
    <div className="filter-container">
      <div className="filter-count">
        <span>Available bikes: {props.bike}</span>
      </div>
      <div className="filter-search">
        <BiSearchAlt />
        <input
          className="input_search"
          value={props.search}
          type="text"
          placeholder="Find bike..."
          autoComplete="off"
          onChange={(e) => props.searchBikes(e)}
        />
      </div>
      <div className="filter-sort">
        <span>Sort by:</span>
        <select
          className="sort-select"
          value={props.sort}
          onChange={(e) => props.sortBikes(e)}
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
          onChange={(e) => props.filterBikes(e)}
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

export default Filter;
