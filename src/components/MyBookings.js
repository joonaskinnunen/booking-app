/* eslint-disable react/prop-types */
import React from "react"
import { Link } from "react-router-dom"
import { ListGroup } from "react-bootstrap"
import { Trash } from "react-bootstrap-icons"

const MyBookings = ({ bookings, user, bookingService, setBookings, setMessage, setMessagevariant }) => {
  let myBookings = bookings.filter(booking => booking.user.username === user.username)

  const handleRemove = (id, question) => {
    const confirmRemove = window.confirm(`Are you sure you want to delete ${question}`)
    if(confirmRemove) {
      bookingService.remove(id).then(response => {
        setBookings(bookings.filter(booking => booking.id !== id))
        myBookings = bookings.filter(booking => booking.user.id !== user.id)
        setMessagevariant("success")
        setMessage(`The poll ${response.dates[0] + "-" + response.dates[1]} deleted`)
      }).catch(error => {
        console.log(error)
        setMessagevariant("danger")
        setMessage("Error. Try again later.")
      })
      setTimeout(() => {
        setMessage("")
      }, 3000)
    }
  }

  const BookingsListing = () => {
    return (
      <>
        <p>From below you can find all your bookings</p>
        <ListGroup>
          {myBookings.map(booking =>
            <ListGroup.Item key={booking.id}>{booking.dates[0] + "-" + booking.dates[1]}<button style={{ backgroundColor: "white", border: "none", marginLeft: "20px" }} onClick={() => handleRemove(booking.id, booking.dates)}><Trash /></button></ListGroup.Item>
          )}
        </ListGroup>
      </>
    )
  }
  return (
    <div>
      <h1>My bookings</h1>
      {myBookings.length > 0 ? <BookingsListing /> : <p>You have no bookings yet.</p>}
    </div>
  )
}

export default MyBookings