//Feature 1
import React, { useState } from "react";
import Bikes from "./components/Bikes/Bikes";
import data from "./data.json";
// import FilterSearch from "./components/Filter Search/FilterSearch";
import Filter from "./components/Filter/Filter";

const App = () => {
  const [bikes, setBikes] = useState(data.bikes);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");

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
            : a._id < b._id
            ? 1
            : -1
        )
    );
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
    }
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
    }
  };

  return (
    <div className="app-container">
      <header>
        <a href="/">🚲Bikes rental</a>
      </header>
      <main className="main">
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
        <div className="content">
          <div className="main-content">
            <Bikes bikes={bikes} search={search} />
          </div>
          <div className="sidebar">pasek boczny</div>
        </div>
      </main>
      <footer>information footer</footer>
    </div>
  );
};

export default App;
