/* eslint-disable react/prop-types */
import './Dashboard.scss'
import React, { useState } from 'react'
import { isLogged, logOut } from '../../accounts//duck/index'
import DashboardAddBike from '../DashboardAddBike/DashboardAddBike'
import DashboardOrders from '../DashboardOrders/DashboardOrders'
import { FiBox } from 'react-icons/fi'
import { IoIosLogOut } from 'react-icons/io'
import { MdAddShoppingCart } from 'react-icons/md'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

const Dashboard = ({ currentUser, logged, isLogged, logOut }) => {
  const [commandCenter, setCommandCenter] = useState(false)
  const [addBikeCenter, setAddBikeCenter] = useState(false)

  const history = useHistory()

  const logOutHandler = () => {
    logOut()
    isLogged(false)
    history.push('/home')
  }

  const showOrdersHandler = () => {
    setCommandCenter(!commandCenter)
    setAddBikeCenter(false)
  }
  const showAddBikeHandler = () => {
    setAddBikeCenter(!addBikeCenter)
    setCommandCenter(false)
  }

  return (
    logged && (
      <div className="dashboard-container">
        <img
          className="background-img"
          src="Images/dashboard-background.jpg"
          alt="cyclist"
        />
        {commandCenter
          ? (
          <DashboardOrders
            showOrdersHandler={showOrdersHandler}
            commandCenter={commandCenter}
          />
            )
          : null}
        {addBikeCenter
          ? (
          <DashboardAddBike showAddBikeHandler={showAddBikeHandler} />
            )
          : null}
        <div className="dashboard-box">
          <h2>Welcome {currentUser.currentUserName}</h2>
          <p>{currentUser.currentUserEmail}</p>
          {currentUser.currentUserEmail === 'admin@admin.com'
            ? (
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
              )
            : null}
          <button className="dash-btn" onClick={logOutHandler}>
            logout <IoIosLogOut />
          </button>
        </div>
      </div>
    )
  )
}

export default connect(
  (state) => ({
    currentUser: state.accounts.currentUser,
    logged: state.accounts.logged
  }),
  { isLogged, logOut }
)(Dashboard)
