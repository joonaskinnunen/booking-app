import React, {useEffect} from "react"
import { ListGroup } from "react-bootstrap"
import { Trash } from "react-bootstrap-icons"
import ReactTooltip from 'react-tooltip';

const MyBookings = ({ bookings, user, bookingService, setBookings, setMessage, setMessagevariant }) => {
  useEffect(() => {
    bookingService
      .getAll()
      .then(initialBookings => {
        setBookings(initialBookings)
      })
  }, [bookingService, setBookings])

  let myBookings = bookings.filter(booking => booking.user.username === user.username)

  const handleRemove = (id) => {
    const confirmRemove = window.confirm(`Haluatko varmasti poistaa varauksen?`)
    if(confirmRemove) {
      bookingService.remove(id).then(response => {
        setBookings(bookings.filter(booking => booking.id !== id))
        myBookings = bookings.filter(booking => booking.user.id !== user.id)
        setMessagevariant("success")
        setMessage("Varaus poistettu")
      }).catch(error => {
        console.log(error)
        setMessagevariant("danger")
        setMessage("Virhe. Yritä myöhemmin uudelleen.")
      })
      setTimeout(() => {
        setMessage("")
      }, 3000)
    }
  }

  const BookingsListing = () => {
    return (
      <>
        <ReactTooltip id="removeBooking" place="top" effect="solid" />
        <p>Alta löydät tekemäsi varaukset.</p>
        <ListGroup>
          {myBookings.map(booking =>
            <ListGroup.Item key={booking.id}>{`${new Date(booking.dates[0]).getDate()}.${new Date(booking.dates[0]).getMonth() + 1}.${new Date(booking.dates[0]).getFullYear()} - ${new Date(booking.dates[1]).getDate()}.${new Date(booking.dates[1]).getMonth() + 1}.${new Date(booking.dates[0]).getFullYear()}`}<button style={{ backgroundColor: "white", border: "none", marginLeft: "20px" }} onClick={() => handleRemove(booking.id)} data-tip="Poista varaus" data-for="removeBooking"><Trash /></button></ListGroup.Item>          )}
        </ListGroup>
      </>
    )
  }
  return (
    <div>
      <h1>Varaukseni</h1>
      {myBookings.length > 0 ? <BookingsListing /> : <p>Sinulla ei ole varauksia.</p>}
    </div>
  )
}

export default MyBookings