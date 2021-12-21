import React from "react";
import { goUp } from "../../bikes/duck/index";
import {
  AiOutlineInstagram,
  AiOutlineFacebook,
  AiOutlineYoutube,
  AiOutlineRocket,
} from "react-icons/ai";
import { RiTwitterLine } from "react-icons/ri";
import { connect } from "react-redux";
import { RiArrowDropRightLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import "./Footer.scss";

const footer = ({ logged, goUp }) => {
  return (
    <footer>
      <div className="social-media">
        <a
          href="https://www.instagram.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <AiOutlineInstagram />
        </a>
        <a
          href="https://www.twitter.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <RiTwitterLine />
        </a>
        <a
          href="https://www.facebook.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <AiOutlineFacebook />
        </a>
        <a
          href="https://www.youtube.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <AiOutlineYoutube />
        </a>
      </div>
      <div>
        <button onClick={goUp}>
          Go up!
          <AiOutlineRocket
            size="25px"
            className="rocket animate__animated animate__heartBeat  animate__infinite"
          />
        </button>
      </div>

      <div className="navigation-footer-box">
        <h4 className="h4-fotter">Navigation</h4>
        <NavLink className="nav-link-fotter" to="/home">
          Home{" "}
          <RiArrowDropRightLine className="arrow animate__animated animate__heartBeat  animate__infinite" />
        </NavLink>
        <NavLink className="nav-link-fotter" to="/shop">
          Shop{" "}
          <RiArrowDropRightLine className="arrow animate__animated animate__heartBeat  animate__infinite" />
        </NavLink>
        {logged ? (
          <NavLink className="nav-link-fotter" to="/dashboard">
            Dashboard{" "}
            <RiArrowDropRightLine className="arrow animate__animated animate__heartBeat  animate__infinite" />
          </NavLink>
        ) : null}

        <NavLink className="nav-link-fotter" to="/register">
          Register{" "}
          <RiArrowDropRightLine className="arrow animate__animated animate__heartBeat  animate__infinite" />
        </NavLink>

        <NavLink className="nav-link-fotter" to="/login">
          Login{" "}
          <RiArrowDropRightLine className="arrow animate__animated animate__heartBeat  animate__infinite" />
        </NavLink>
      </div>
    </footer>
  );
};

export default connect(
  (state) => ({
    logged: state.accounts.logged,
  }),
  { goUp }
)(footer);
