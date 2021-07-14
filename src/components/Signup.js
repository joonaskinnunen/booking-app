import React, { useState } from "react"
import { Button, Form, Row } from "react-bootstrap"
import { Redirect } from "react-router-dom"

const Signup = ({ signupService, setMessage, setMessagevariant }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [firstname, setFirstName] = useState("")
  const [lastname, setLastName] = useState("")
  const [isSignedup, setIsSignedup] = useState(false)
  const [role, setRole] = useState(1);

  const handleSignup = async (event) => {
    event.preventDefault()
    if (username.length < 5) {
      setMessagevariant("danger")
      setMessage("Käyttäjänimen pitää olla vähintään 5 merkkiä pitkä")
    } else if (password.length < 8) {
      setMessagevariant("danger")
      setMessage("Käyttäjänimen pitää olla vähintään 8 merkkiä pitkä")
    } else {
      const name = `${firstname} ${lastname}`
      try {
        const user = await signupService.signup({
          username, name, role, password
        })
        setUsername("")
        setPassword("")
        setFirstName("")
        setLastName("")
        setIsSignedup(true)
        setMessagevariant("success")
        setMessage("Rekisteröinti onnistui! Voit nyt kirjautua sisään.")
      } catch (exception) {
        console.log(exception)
        setMessagevariant("danger")
        setMessage("Virhe rekisteröitymisessä. Käyttäjätunnus voi olla jo varattu.")
      }
    }
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const onChangeRole = (event) => {
    console.log(event.target.value);
    setRole(event.target.value)
  }

  return (
    <>
      {isSignedup && <Redirect to="/login" />}
      <h3>Rekisteröidy</h3>
      <Row className="justify-content-center">
        <Form onSubmit={handleSignup}>
          <Form.Group>
            <Form.Label>Etunimi:</Form.Label>
            <Form.Control required value={firstname} onChange={({ target }) => setFirstName(target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Sukunimi:</Form.Label>
            <Form.Control required value={lastname} onChange={({ target }) => setLastName(target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Käyttäjätunnus:</Form.Label>
            <Form.Control required value={username} onChange={({ target }) => setUsername(target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Salasana:</Form.Label>
            <Form.Control required type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
          </Form.Group>
          <Form.Group>
          <Form.Label>Rooli:</Form.Label>
          <Form.Control
          as="select"
          custom
          onChange={(onChangeRole)}
        >
          <option value={1}>Lapsi</option>
          <option value={2}>Lapsenlapsi</option>
        </Form.Control>
        </Form.Group>
          <Button variant="primary" type="submit">
            Rekisteröidy
          </Button>
        </Form>
      </Row>
    </>)
}

export default Signup
