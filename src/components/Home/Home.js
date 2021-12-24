import './Home.scss'
import { FaReact, FaSass } from 'react-icons/fa'
import { SiFirebase, SiGithub, SiRedux } from 'react-icons/si'
import { GiResize } from 'react-icons/gi'
import React from 'react'

const Home = () => {
  return (
    <div className="home-container">
      <section className="title-section">
        <div className="box-title">
          <h1 className="tittle-h1">WELCOME</h1>
          <h1 className="tittle-h1">IN MY</h1>
          <h1 className="tittle-h1">APP!</h1>
        </div>
      </section>
      <div className="connector">
        <p>MORE...</p>
      </div>
      <section className="info-section">
        <div className="box-info">
          <h2>About the application </h2>
          <p>This is a simulation of a bicycle shop.</p>
          <p>Admin can manage product cards.</p>
          <p>He can add and remove cards and check & deleted orders,</p>
          <p>but only after logging in as admin.</p>
          <p>
            <b>admin@admin.com</b>
          </p>
          <p>
            <b>123456</b>
          </p>
          <p>
            In this app, order data is stored using the <b>firebase</b>.
          </p>
          <p>
            However, logging in, registering and adding cards is intentionally
            only simulated by me.
          </p>
          <p>
            I wanted to this data to disappear after refreshing the page and not
            to clutter.
          </p>
          <p>You can choise size your bike and colors. Have fun! 👨‍💻</p>
        </div>
        <div className="box-img-home">
          <img
            src="Images/homeInfo1.jpeg"
            alt="information"
          />
          <img
            src="Images/homeInfo2.png"
            alt="information"
          />
        </div>
      </section>
      <section className="technology-section">
        <h2>Technologies used</h2>
        <div className="icon-container">
          <div className="icon-box">
            <FaReact className="icon-tehchnology" />
            <h6>React</h6>
          </div>
          <div className="icon-box">
            <SiRedux className="icon-tehchnology" />
            <h6>Redux</h6>
          </div>
          <div className="icon-box">
            <FaSass className="icon-tehchnology" />
            <h6>Sass</h6>
          </div>
          <div className="icon-box">
            <SiFirebase className="icon-tehchnology" />
            <h6>Firebase</h6>
          </div>
          <div className="icon-box">
            <SiGithub className="icon-tehchnology" />
            <h6>Github</h6>
          </div>
          <div className="icon-box">
            <GiResize className="icon-tehchnology" />
            <h6>Responsive</h6>
          </div>
        </div>
      </section>
      <div className="color-box-home"></div>
    </div>
  )
}

export default Home
