/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react"
import Calendar from 'react-calendar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box'
import bookingService from '../services/bookings'
import 'react-calendar/dist/Calendar.css';
import ReactTooltip from 'react-tooltip';
import { Redirect } from "react-router-dom"

const Home = ({ bookings, setBookings, user, setMessage, setMessagevariant, disabledDays }) => {

  const [value, onChange] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    ReactTooltip.rebuild()
  });


  const styles = {
    button: {
      marginTop: 10
    },
    container: {
      marginTop: 20
    }
  }

  const rangeContainsDate = (dates, range) => {
    console.log(dates)
    console.log(range)
    for(let i = 0; i < dates.length; i++) {
      console.log(new Date(dates[i].date) <= new Date(range[1]))
      if(new Date(dates[i].date) <= new Date(range[1]) && new Date(dates[i].date) >= new Date(range[0])) {
        return true
      }
    }
    return false
  }

  const handleBooking = () => {
    console.log(user)
    if(value.length < 1) {
      setMessagevariant("danger")
      setMessage("Valitse varattavat päivät. Jos olet varaamassa yksittäistä päivää, tuplaklikkaa kyseistä päivää")
      setTimeout(() => {
        setMessage("")
      }, 5000)
    } else {
      const lastDateRole2 = new Date()
      lastDateRole2.setDate(lastDateRole2.getDate() + 14);
      console.log(lastDateRole2)
      console.log(new Date(value[1]) > lastDateRole2)
    if(user.role === 2 && new Date(value[1]) > lastDateRole2 ) {
      window.alert("Et voi tehdä varausta yli 2 viikon päähän")
    } else if(rangeContainsDate(disabledDays, value)) {
      window.alert(`${value[0].getDate()}.${value[0].getMonth() + 1}.${value[0].getFullYear()} - ${value[1].getDate()}.${value[1].getMonth() + 1}.${value[0].getFullYear()} sisältää jo varattuja päiviä. Tarkista varausaika.`)
    } else {
    const confirmBooking = window.confirm(`Haluatko varmasti tehdä varauksen ajalle ${value[0].getDate()}.${value[0].getMonth() + 1}.${value[0].getFullYear()} - ${value[1].getDate()}.${value[1].getMonth() + 1}.${value[0].getFullYear()}?`)
    if (confirmBooking) {
      const newObj = {
        dates: value
      }
      bookingService.create(newObj).then(response => {
        setBookings(bookings.concat(response))
        setMessagevariant("success")
        setMessage(`${new Date(response.dates[0]).getDate()}.${new Date(response.dates[0]).getMonth() + 1}.${new Date(response.dates[0]).getFullYear()} - ${new Date(response.dates[1]).getDate()}.${new Date(response.dates[1]).getMonth() + 1}.${new Date(response.dates[0]).getFullYear()} varattu.`)
        setIsSuccess(true)
      }).catch(error => {
        console.log(error)
        setMessagevariant("danger")
        setMessage("Virhe varaamisessa. Yritä myöhemmin uudelleen.")
      })
      setTimeout(() => {
        setMessage("")
      }, 5000)
    }
  }
  }
  }

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      for (let i = 0; i < disabledDays.length; i++) {
        const firstChars = disabledDays[i].booker.charAt(0) + disabledDays[i].booker.split(" ")[1].charAt(0)
        if (date.getFullYear() === disabledDays[i].date.getFullYear() &&
          date.getMonth() === disabledDays[i].date.getMonth() &&
          date.getDate() === disabledDays[i].date.getDate()) {
          return <p data-tip={"Varattu: " + disabledDays[i].booker} data-for="bookerName">{firstChars}</p>
        }
      }
    }
  }

  const tileStyle = ({ date, view }) => {
    if (view === 'month') {
      for (let i = 0; i < disabledDays.length; i++) {
        if (date.getFullYear() === disabledDays[i].date.getFullYear() &&
          date.getMonth() === disabledDays[i].date.getMonth() &&
          date.getDate() === disabledDays[i].date.getDate()) {
          return "disabledTile"
        }
      }
    }
  }

  console.log(value)

  return (
    <div>
      {isSuccess && <Redirect to="/mybookings" />}
      {user == null && <Redirect to="/login" />}
      <ReactTooltip id="bookerName" place="top" effect="solid" />
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" style={styles.container}>
        <Calendar
          onChange={onChange}
          value={value}
          selectRange={true}
          tileDisabled={({ date, view }) =>
            (disabledDays && view === 'month') &&
            disabledDays.some(disabledDate =>
              date.getFullYear() === disabledDate.date.getFullYear() &&
              date.getMonth() === disabledDate.date.getMonth() &&
              date.getDate() === disabledDate.date.getDate()
            )}
          tileContent={tileContent}
          tileClassName={tileStyle}
        />
        <Button variant="contained" color="primary" style={styles.button} onClick={handleBooking}>
          Tee varaus
        </Button>
      </Box>
    </div>
  );
}

export default Home
