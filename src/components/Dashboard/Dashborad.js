import React from "react";
import "./Dashboard.scss";
import { connect } from "react-redux";
import { isLogged, logOut } from "../../accounts//duck/index";
import { useHistory } from "react-router-dom";

const Dashboard = ({ currentUser, logged, isLogged, logOut }) => {
  const history = useHistory();

  const logOutHandler = () => {
    logOut();
    isLogged(false);
    history.push("/home");
  };

  return (
    logged && (
      <div className="dashboard_container">
        <h1>Welcome {currentUser.currentUserName}</h1>
        <p>{currentUser.currentUserEmail}</p>
        <button onClick={logOutHandler}>logOut</button>
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
