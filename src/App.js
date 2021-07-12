import React, { useState, useEffect } from "react"
import "./App.css"
import bookingService from "./services/bookings"
import loginService from "./services/login"
import signupService from "./services/signup"
import Home from "./components/Home"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Login from "./components/Login"
import Signup from "./components/Signup"
import MessageAlert from "./components/MessageAlert"
import MyBookings from "./components/MyBookings"
import { Container } from "react-bootstrap"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom"

const App = () => {
  const [bookings, setBookings] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [messageVariant, setMessageVariant] = useState("")
  const [disabledDays, setDisabledDays] = useState([])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedVoteappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      bookingService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    bookingService
      .getAll()
      .then(initialBookings => {
        setBookings(initialBookings)
        const dateArray = []
        for (let i = 0; i < initialBookings.length; i++) {
        let currentDate = new Date(initialBookings[i].dates[0])
        const stopDate = new Date(initialBookings[i].dates[1])
        console.log(currentDate)
        console.log(stopDate)
        while (currentDate <= stopDate) {
            dateArray.push(new Date (currentDate))
            currentDate.setDate(currentDate.getDate() + 1)
        }
      }
      setDisabledDays(dateArray)
      })
  }, [])

  useEffect(() => {
    document.title = "Mökkivaraus"
  }, [])

  const handleLogout = () => {
    loginService.logout()
    setUser(null)
    setMessageVariant("success")
    setMessage("Logged out successfully")
    setTimeout(() => {
      setMessage("")
    }, 3000)
  }

  console.log(disabledDays)

  return (
    <div>
      <Container fluid>
        <Router>
          <Header user={ user } logout={ handleLogout } />
          <Switch>
            <Route path="/login">
              {user !== null ? <Redirect to="/mypolls" /> : <Login loginService={loginService} user={user} setUser={setUser} username={username} setUsername={setUsername} password={password} setPassword={setPassword} setMessage={setMessage} setMessagevariant={setMessageVariant} />}
            </Route>
            <Route path="/signup">
              {user !== null ? <Redirect to="/mypolls" /> : <Signup signupService={signupService} setMessage={setMessage} setMessagevariant={setMessageVariant} />}
            </Route>
            <Route path="/mybookings">
              {user !== null ? <MyBookings bookings={bookings} user={user} bookingService={bookingService} setBookings={setBookings} setMessage={setMessage} setMessagevariant={setMessageVariant} /> : <p><Link to="/login">Login</Link> to see your bookings.</p> }
            </Route>
            <Route path="/">
              <Home bookings={bookings} setBookings={setBookings} message={message} setMessage={setMessage} setMessagevariant={setMessageVariant} user={user} disabledDays={disabledDays} />
            </Route>
          </Switch>
        </Router>
        <div style={{ width: "300px", margin: "auto" }}>
          <MessageAlert message={message} messageVariant={messageVariant} />
        </div>
        <Footer />
      </Container>
    </div>
  )
}

export default App
