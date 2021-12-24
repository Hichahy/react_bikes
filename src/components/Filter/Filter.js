/* eslint-disable react/prop-types */
import './Filter.scss'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import React, { useEffect, useState } from 'react'
import {
  filterBySearch,
  filterBySize,
  filterByVarious
} from '../../bikes/duck/index'
import { BiSearchAlt } from 'react-icons/bi'
import { connect } from 'react-redux'

const Filter = ({
  mobileMode,
  assortment,
  filteredItems,
  letters,
  filterByVarious,
  filterBySearch,
  filterBySize,
  size,
  sort
}) => {
  const [mobileFilter, setMobileFilter] = useState(false)

  useEffect(() => {
    if (!mobileMode) {
      setMobileFilter(false)
    } else {
      setMobileFilter(true)
    }
  }, [mobileMode])

  const toggleMobileFilter = () => {
    setMobileFilter((prev) => !prev)
  }

  return (
    <section className="filter-container">
      <div className="filter-count">
        <span>Available bikes: {filteredItems.length}</span>
      </div>
      {mobileMode
        ? (
            mobileFilter
              ? (
          <button className="btn-filter" onClick={toggleMobileFilter}>
            <AiOutlineEye style={{ marginRight: '10px' }} /> Show filters
          </button>
                )
              : (
          <button className="btn-filter" onClick={toggleMobileFilter}>
            <AiOutlineEyeInvisible style={{ marginRight: '10px' }} /> Hide
            filters
          </button>
                )
          )
        : null}
      <div className={mobileFilter ? 'filter-box-active' : 'filter-box'}>
        <div className="filter-search">
          <BiSearchAlt />
          <input
            className="input-search"
            value={letters}
            type="text"
            placeholder="Find bike..."
            autoComplete="off"
            onChange={(e) => filterBySearch(assortment, e.target.value)}
          />
        </div>
        <div className="filter-sort">
          <span>Sort:</span>
          <select
            className="sort-select"
            value={sort}
            onChange={(e) => filterByVarious(assortment, e.target.value)}
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
            value={size}
            onChange={(e) => filterBySize(assortment, e.target.value)}
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
  )
}

export default connect(
  (state) => ({
    size: state.products.size,
    sort: state.products.sort,
    letters: state.products.letters,
    assortment: state.products.assortment,
    filtered: state.products.filtered,
    filteredItems: state.products.filteredItems,
    mobileMode: state.products.mobileMode
  }),
  {
    filterBySize,
    filterByVarious,
    filterBySearch
  }
)(Filter)
