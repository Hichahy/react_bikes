//Feature 1
import React, { useState } from "react";
import Bikes from "./components/Bikes/Bikes";
import data from "./data.json";

const App = () => {
  const [bikes, setBikes] = useState(data.bikes);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");

  return (
    <div className="app-container">
      <header>
        <a href="/">Bikes rental</a>
      </header>
      <main>
        <div className="content">
          <div className="main-content">
            <Bikes bikes={bikes} />
          </div>
          <div className="sidebar">pasek boczny</div>
        </div>
      </main>
      <footer>information footer</footer>
    </div>
  );
};

export default App;
