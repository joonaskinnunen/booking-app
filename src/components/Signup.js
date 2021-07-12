import React, { useState } from "react"
import { Button, Form, Row } from "react-bootstrap"
import { Redirect } from "react-router-dom"

const Signup = ( { signupService, setMessage, setMessagevariant } ) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [firstname, setFirstName] = useState("")
  const [lastname, setLastName] = useState("")
  const [isSignedup, setIsSignedup] = useState(false)

  const handleSignup = async (event) => {
    event.preventDefault()
    if(username.length < 5) {
      setMessagevariant("danger")
      setMessage("Username has to be at least 5 characters long")
    } else if(password.length < 8) {
      setMessagevariant("danger")
      setMessage("Password has to be at least 8 characters long")
    } else {
      const name = `${firstname} ${lastname}`
      try {
        const user = await signupService.signup({
          username, name, password
        })
        setUsername("")
        setPassword("")
        setFirstName("")
        setLastName("")
        setIsSignedup(true)
        setMessagevariant("success")
        setMessage("Signed up succesfully! You can now log in.")
      } catch (exception) {
        console.log(exception)
        setMessagevariant("danger")
        setMessage("Error creating a new user")
      }
    }
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <>
      {isSignedup && <Redirect to="/login" />}
      <h3>Sign up</h3>
      <Row className="justify-content-center">
        <Form onSubmit={handleSignup}>
          <Form.Group>
            <Form.Label>First name</Form.Label>
            <Form.Control required value={firstname} onChange={({ target }) => setFirstName(target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last name</Form.Label>
            <Form.Control required value={lastname} onChange={({ target }) => setLastName(target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control required value={username} onChange={({ target }) => setUsername(target.value)} />
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
    </>  )
}

export default Signup
