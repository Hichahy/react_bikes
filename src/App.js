import React, { useState } from "react";
import Bikes from "./components/Bikes/Bikes";
import data from "./data.json";
import Filter from "./components/Filter/Filter";
import Basket from "./components/Baket.js/Basket";

const App = () => {
  const [bikes, setBikes] = useState(data.bikes);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("none");
  const [search, setSearch] = useState("");
  const [basketItems, setBasketItems] = useState([]);

  console.log(`basketItems`, basketItems);

  const removeFromBasket = (bike) => {
  const cartItems = basketItems.slice();
  setBasketItems(cartItems.filter(i => i._id !== bike._id))
  }
 
  const addToBasket = (bike) => {
    const cartItems = basketItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((i) => {
      if (i._id === bike._id) {
        i.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...bike, count: 1 });
    }
    setBasketItems(cartItems);
  };

  const filterBikes = (e) => {
    if (e.target.value === "") {
      setBikes(data.bikes);
      setSize(e.target.value);
    } else {
      setSize(e.target.value);
      setBikes(
        data.bikes.filter(
          (bike) => bike.avaibleSizesz.indexOf(e.target.value) >= 0
        )
      );
      setSort("none");
    }
  };

  const sortBikes = (e) => {
    const sort = e.target.value;
    setSort(e.target.value);
    setBikes(
      bikes
        .slice()
        .sort((a, b) =>
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
        )
    );
  };

  const searchBikes = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setBikes(data.bikes);
      setSearch(e.target.value);
    } else {
      setBikes(
        data.bikes.filter((bike) =>
          bike.tittle.toLowerCase().includes(search.toLowerCase())
        )
      );
      setSize("");
      setSort("none");
    }
  };

  return (
    <div className="app-container">
      <header>
        <a href="/">🚲Bikes rental</a>
      </header>
      <main className="main">
        <div className="content">
          <div className="content-bikes">
           
              <Filter
                size={size}
                sort={sort}
                search={search}
                bike={bikes.length}
                filterBikes={filterBikes}
                sortBikes={sortBikes}
                setSearch={setSearch}
                searchBikes={searchBikes}
              />
         
            <div className="main-content">
              {bikes.length === 0 ? (
                <span className="not-found">sorry not found...</span>
              ) : (
                <Bikes
                  bikes={bikes}
                  search={search}
                  addToBasket={addToBasket}
                />
              )}
            </div>
          </div>
          <div className="sidebar">
            <Basket basketItems={basketItems} removeFromBasket={removeFromBasket}/>
          </div>
        </div>
      </main>
      <footer>information footer</footer>
    </div>
  );
};

export default App;
