/* eslint-disable react/prop-types */
import React, { useState } from "react"
import Calendar from 'react-calendar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box'
import bookingService from '../services/bookings'
import 'react-calendar/dist/Calendar.css';

const Home = ({ bookings, setBookings, user, setMessage, setMessagevariant, disabledDays }) => {

  const [value, onChange] = useState(new Date());
  console.log(bookings)

  const styles = {
    button: {
      marginTop: 10
    },
    container: {
      marginTop: 20
    }
  }

  const handleBooking = () => {
    const confirmBooking = window.confirm(`Are you sure you want to book ${value[0]}  - ${value[1]}`)
    if(confirmBooking) {
      const newObj = {
        dates: value
      }
      bookingService.create(newObj).then(response => {
        setBookings(bookings.concat(response))
        setMessagevariant("success")
        setMessage(`${response.dates[0] + "-" + response.dates[1]} booked`)
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

  return (
    <div>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" style={styles.container}>
          <Calendar
            onChange={onChange}
            value={value}
            selectRange={true}
            showWeekNumbers={true}
            tileDisabled={({date, view}) =>
                    (disabledDays && view === 'month') && // Block day tiles only
                    disabledDays.some(disabledDate =>
                      date.getFullYear() === disabledDate.getFullYear() &&
                      date.getMonth() === disabledDate.getMonth() &&
                      date.getDate() === disabledDate.getDate()
                    )}
          />
          <Button variant="contained" color="primary" style={styles.button} onClick={handleBooking}>
            Tee varaus
          </Button>
        </Box>
    </div>
  );
}

export default Home
