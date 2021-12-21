import React, { useState } from "react";
import "./Dashboard.scss";
import { connect } from "react-redux";

import { isLogged, logOut } from "../../accounts//duck/index";
import { IoIosLogOut } from "react-icons/io";
import { FiBox } from "react-icons/fi";
import { MdAddShoppingCart } from "react-icons/md";
import { useHistory } from "react-router-dom";
import DashboardOrders from "../DashboardOrders/DashboardOrders";
import DashboardAddBike from "../DashboardAddBike/DashboardAddBike";

const Dashboard = ({ currentUser, logged, isLogged, logOut }) => {
  const [commandCenter, setCommandCenter] = useState(false);
  const [addBikeCenter, setAddBikeCenter] = useState(false);

  let history = useHistory();

  const logOutHandler = () => {
    logOut();
    isLogged(false);
    history.push("/home");
  };

  const showOrdersHandler = () => {
    setCommandCenter(!commandCenter);
    setAddBikeCenter(false);
  };
  const showAddBikeHandler = () => {
    setAddBikeCenter(!addBikeCenter);
    setCommandCenter(false);
  };

  return (
    logged && (
      <div className="dashboard-container">
        <img
          className="background-img"
          src="Images/dashboard-background.jpg"
          alt="cyclist"
        />
        {commandCenter ? (
          <DashboardOrders
            showOrdersHandler={showOrdersHandler}
            commandCenter={commandCenter}
          />
        ) : null}
        {addBikeCenter ? (
          <DashboardAddBike showAddBikeHandler={showAddBikeHandler} />
        ) : null}
        <div className="dashboard-box">
          <h2>Welcome {currentUser.currentUserName}</h2>
          <p>{currentUser.currentUserEmail}</p>
          {currentUser.currentUserEmail === "admin@admin.com" ? (
            <>
              <button className="dash-btn" onClick={showOrdersHandler}>
                show orders
                <FiBox />
              </button>
              <button className="dash-btn" onClick={showAddBikeHandler}>
                add bike
                <MdAddShoppingCart />
              </button>
            </>
          ) : null}
          <button className="dash-btn" onClick={logOutHandler}>
            logout <IoIosLogOut />
          </button>
        </div>
      </div>
    )
  );
};

export default connect(
  (state) => ({
    currentUser: state.accounts.currentUser,
    logged: state.accounts.logged,
  }),
  { isLogged, logOut }
)(Dashboard);
