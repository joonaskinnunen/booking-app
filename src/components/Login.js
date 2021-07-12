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
      setMessage(`${username} logged in successfully!`)
    } catch (exception) {
      console.log(exception)
      setMessagevariant("danger")
      setMessage("Wrong username or password")
    }
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <>
      <h3>Login</h3>
      <p>Log in if you have an account</p>
      <Row className="justify-content-center">
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control required value={username} key="1" onChange={({ target }) => setUsername(target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password:</Form.Label>
            <Form.Control required type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Row>
      <hr />
      <h3 style={{ marginTop: "50px" }}>Sign up</h3>
      <p>Or sign up if you dont have an account already</p>
      <Link to="/signup"><Button variant="primary" size="lg">
      Sign up
      </Button>
      </Link>
    </>  )
}

export default Login
