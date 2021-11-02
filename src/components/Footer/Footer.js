import React from "react";
import {
  AiOutlineInstagram,
  AiOutlineFacebook,
  AiOutlineYoutube,
  AiOutlineRocket,
} from "react-icons/ai";
import { RiTwitterLine } from "react-icons/ri";
import { RiArrowDropRightLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import "./Footer.scss";

const footer = () => {
  const goUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
        <button onClick={() => goUp()}>
          Go up!
          <AiOutlineRocket
            size="25px"
            className="rocket animate__animated animate__heartBeat  animate__infinite"
          />
        </button>
      </div>

      <div className="navigation-footer-box">
        <h4 className="h4-fotter">Navigation</h4>
        <NavLink className="NavLink-fotter" to="/home">
          Home{" "}
          <RiArrowDropRightLine className="arrow animate__animated animate__heartBeat  animate__infinite" />
        </NavLink>
        <NavLink className="NavLink-fotter" to="/shop">
          Shop{" "}
          <RiArrowDropRightLine className="arrow animate__animated animate__heartBeat  animate__infinite" />
        </NavLink>
        <NavLink className="NavLink-fotter" to="/register">
          Register{" "}
          <RiArrowDropRightLine className="arrow animate__animated animate__heartBeat  animate__infinite" />
        </NavLink>
        <NavLink className="NavLink-fotter" to="/login">
          Login{" "}
          <RiArrowDropRightLine className="arrow animate__animated animate__heartBeat  animate__infinite" />
        </NavLink>
      </div>
    </footer>
  );
};

export default footer;
