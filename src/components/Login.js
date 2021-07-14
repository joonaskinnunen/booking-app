/* eslint-disable react/prop-types */
import React from "react"
import { Button, Form, Row } from "react-bootstrap"
import bookingService from "../services/bookings"
import { Link } from "react-router-dom"

const Login = ( { loginService, setUsername, username, setPassword, password, setUser, setMessage, setMessagevariant } ) => {
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        "loggedVoteappUser", JSON.stringify(user)
      )

      bookingService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
      setMessagevariant("success")
      setMessage(`${username} kirjattu sisään onnistuneesti!`)
    } catch (exception) {
      console.log(exception)
      setMessagevariant("danger")
      setMessage("Väärä käyttäjänimi tai salasana")
    }
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <>
      <h3>Kirjaudu</h3>
      <p>Kirjaudu sisään jos olet jo aiemmin rekisteröitynyt</p>
      <Row className="justify-content-center">
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>Käyttäjänimi:</Form.Label>
            <Form.Control required value={username} key="1" onChange={({ target }) => setUsername(target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Salasana:</Form.Label>
            <Form.Control required type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Kirjaudu
          </Button>
        </Form>
      </Row>
      <hr />
      <h3 style={{ marginTop: "50px" }}>Rekisteröidy</h3>
      <p>Rekisteröidy jos sinulla ei ole vielä tunnuksia</p>
      <Link to="/signup"><Button variant="primary" size="lg">
      Rekisteröidy
      </Button>
      </Link>
    </>  )
}

export default Login
