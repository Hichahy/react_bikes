import React, { useState, useEffect } from "react";
import "./Filter.scss";
import { BiSearchAlt } from "react-icons/bi";
import { connect } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {
  filterBySize,
  filterByVarious,
  filterBySearch,
} from "../../bikes/duck/index";

const Filter = (props) => {
  const [mobileFilter, setMobileFilter] = useState(false);

  useEffect(() => {
    if (!props.mobileMode) {
      setMobileFilter(false);
    } else {
      setMobileFilter(true);
    }
  }, [props.mobileMode]);

  const assortment = props.assortment;

  const toggleMobileFilter = () => {
    setMobileFilter((prev) => !prev);
  };

  return (
    <section className="filter-container">
      <div className="filter-count">
        <span>Available bikes: {props.filteredItems.length}</span>
      </div>
      {props.mobileMode ? (
        mobileFilter ? (
          <button className="btn-filter" onClick={toggleMobileFilter}>
            <AiOutlineEye style={{ marginRight: "10px" }} /> Show filters
          </button>
        ) : (
          <button className="btn-filter" onClick={toggleMobileFilter}>
            <AiOutlineEyeInvisible style={{ marginRight: "10px" }} /> Hide
            filters
          </button>
        )
      ) : null}
      <div className={mobileFilter ? "filter-box-active" : "filter-box"}>
        <div className="filter-search">
          <BiSearchAlt />
          <input
            className="input-search"
            value={props.letters}
            type="text"
            placeholder="Find bike..."
            autoComplete="off"
            onChange={(e) => props.filterBySearch(assortment, e.target.value)}
          />
        </div>
        <div className="filter-sort">
          <span>Sort:</span>
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
    </section>
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
    mobileMode: state.products.mobileMode,
  }),
  {
    filterBySize,
    filterByVarious,
    filterBySearch,
  }
)(Filter);
