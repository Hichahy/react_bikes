/* eslint-disable react/prop-types */
import './DashboardOrders.scss'
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { CircularProgress } from '@mui/material'
import { MdDelete } from 'react-icons/md'
import ModalDashboard from '../../layout/ModalDashboard/ModalDashboard'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const DashboardOrders = ({ showOrdersHandler }) => {
  const [orders, setOrders] = useState([])
  const [deletedOrder, setDeletedOrder] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)

  const handleOpenModal = (id) => {
    setOpen(!open)

    const findOrder = orders.filter((item) => item.id === id)
    setDeletedOrder(findOrder)
  }

  const handleRemoveOrder = () => {
    axios
      .delete(
        // `https://bikes-cbb5f-default-rtdb.firebaseio.com/orders/${deletedOrder[0].id}.json`
        `https://bikeshop-2e62a-default-rtdb.firebaseio.com/orders/${deletedOrder[0].id}.json`
      )
      .then((res) => {
        console.log(res)
        console.log(res.data)
      })
    setIsDeleted(true)
    handleOpenModal()
  }

  const isDeletedTrue = !isDeleted
  useEffect(() => {
    axios
      // .get("https://bikes-cbb5f-default-rtdb.firebaseio.com/orders.json")
      .get('https://bikeshop-2e62a-default-rtdb.firebaseio.com/orders.json')
      .then((res) => {
        const fetchedOrders = []
        for (const key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          })
        }
        setLoading(false)
        setIsDeleted(false)

        setOrders(fetchedOrders)
      })
      .catch(() => {
        setLoading(false)
        setIsDeleted(false)
      })
  }, [isDeletedTrue])

  return (
    <div className="command-box">
      <AiOutlineClose className="x-dash" onClick={showOrdersHandler} />

      {loading
        ? (
        <div className="spinner-box">
          <CircularProgress
            style={{ color: 'black', width: '100px', height: '100px' }}
          />
          <p>loading...</p>
        </div>
          )
        : (
        <>
          <h1>You have {orders.length} orders</h1>
          <div className="order-container">
            {orders.map((i) => (
              <div key={i.contact.orderId} className="order">
                <div className="order-nav">
                  <label className="id-order">
                    Order ID: {i.contact.orderId}
                  </label>
                  <div className="icons-box">
                    <MdDelete
                      className="delete-order"
                      onClick={() => handleOpenModal(i.id)}
                    />
                  </div>
                </div>
                <div className="table-box">
                  <table className="contact-table">
                    <tbody>
                      <tr>Contact:</tr>
                      <tr>
                        <td>Name:</td>
                        <td>{i.contact.name}</td>
                      </tr>
                      <tr>
                        <td>City:</td>
                        <td>{i.contact.city}</td>
                      </tr>
                      <tr>
                        <td>Street:</td>
                        <td>{i.contact.street}</td>
                      </tr>
                      <tr>
                        <td>Email:</td>
                        <td>{i.contact.email}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="order-box">
                    <table>
                      <tbody>
                        <tr>Order:</tr>
                        {i.bikes.checkout.map((o) => (
                          <tr key={uuidv4()}>
                            <td>{o.tittle}</td>
                            <td style={{ width: '10px' }}>
                              <div
                                className="order-color"
                                style={{ background: `${o.selectedColor}` }}
                              />
                            </td>
                            <td style={{ width: '30px' }}>{o.selectedSize}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
          )}

      <ModalDashboard
        open={open}
        handleOpenModal={handleOpenModal}
        orders={orders}
        setOrders={setOrders}
        handleRemoveOrder={handleRemoveOrder}
        deletedOrder={deletedOrder}
      />
    </div>
  )
}

export default DashboardOrders
