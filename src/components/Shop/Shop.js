import React from "react";
import Bikes from "../Bikes/Bikes";
import Filter from "../Filter/Filter";
import Basket from "../Basket/Basket";
import { connect } from "react-redux";
import "./Shop.scss";

const Shop = () => {
  // const [bikes, setBikes] = useState(data.bikes);
  // const [size, setSize] = useState("");
  // const [sort, setSort] = useState("none");
  // const [search, setSearch] = useState("");
  

  // const createOrder = (order) => {
  //   alert("need to save order for " + order.name);
  // };

  // const removeFromBasket = (bike) => {
  //   const cartItems = basketItems.slice();
  //   setBasketItems(cartItems.filter((i) => i._id !== bike._id));
  //   //localStorage
  //   localStorage.setItem(
  //     "basketItems",
  //     JSON.stringify(basketItems.filter((i) => i._id !== bike._id))
  //   );
  // };

  // const addToBasket = (bike) => {
  //   const cartItems = basketItems.slice();
  //   let alreadyInCart = false;
  //   cartItems.forEach((i) => {
  //     if (i._id === bike._id) {
  //       i.count++;
  //       alreadyInCart = true;
  //     }
  //   });
  //   if (!alreadyInCart) {
  //     cartItems.push({ ...bike, count: 1 });
  //   }
  //   setBasketItems(cartItems);
  //   //localStorage
  //   localStorage.setItem("basketItems", JSON.stringify(cartItems));
  // };

  // const filterBikes = (e) => {
  //   if (e.target.value === "") {
  //     setBikes(data.bikes);
  //     setSize(e.target.value);
  //   } else {
  //     setSize(e.target.value);
  //     setBikes(
  //       data.bikes.filter(
  //         (bike) => bike.avaibleSizesz.indexOf(e.target.value) >= 0
  //       )
  //     );
  //     setSort("none");
  //   }
  // };

  // const sortBikes = (e) => {
  //   const sort = e.target.value;
  //   setSort(e.target.value);
  //   setBikes(
  //     bikes
  //       .slice()
  //       .sort((a, b) =>
  //         sort === "lowest"
  //           ? a.price > b.price
  //             ? 1
  //             : -1
  //           : sort === "highest"
  //           ? a.price < b.price
  //             ? 1
  //             : -1
  //           : sort === "alphabet"
  //           ? a.tittle < b.tittle
  //             ? -1
  //             : 1
  //           : a._id < b._id
  //           ? 1
  //           : -1
  //       )
  //   );
  // };

  // const searchBikes = (e) => {
  //   setSearch(e.target.value);
  //   if (e.target.value === "") {
  //     setBikes(data.bikes);
  //     setSearch(e.target.value);
  //   } else {
  //     setBikes(
  //       data.bikes.filter((i) =>
  //         i.tittle.toLowerCase().includes(search.toLowerCase())
  //       )
  //     );
  //     setSize("");
  //     setSort("none");
  //   }
  // };

  return (
    <main className="main">
      <div className="content">
        <div className="content-bikes">
          <Filter
            // size={size}
            // sort={sort}
            // search={search}
            // bike={bikes.length}
            // filterBikes={filterBikes}
            // sortBikes={sortBikes}
            // setSearch={setSearch}
            // searchBikes={searchBikes}
          />

          <div className="main-content">
            {/* {props.assortment.length < 1 ? (
              <span className="not-found">sorry not found...</span>
            ) : (
              // <Bikes bikes={bikes} search={search} />
              <Bikes />
            )} */}
            <Bikes />
          </div>
        </div>
        <div className="sidebar">
          <Basket />
        </div>
      </div>
    </main>
  );
};

export default connect(
  (state) => ({ assortment: state.products.assortment }),
  {}
)(Shop);
