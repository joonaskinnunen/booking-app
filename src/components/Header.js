/* eslint-disable react/prop-types */
import React from "react"
import { Navbar, Nav, NavDropdown } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import Logo from "../cabin-icon.png"

const Header = ({ user, logout }) => {
  return (
    <div className="header">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">
          <img
            src={Logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Mökkivaraus"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Kalenteri</Nav.Link>
            {user === null && <LinkContainer to="/login"><Nav.Link>Rekisteröidy / kirjaudu</Nav.Link></LinkContainer>}
          </Nav>
          <Nav>
            {user !== null && <NavDropdown title={user.name} id="collasible-nav-dropdown">
              <LinkContainer to="/mybookings"><NavDropdown.Item>Omat varaukset</NavDropdown.Item></LinkContainer>
              <NavDropdown.Item onClick={ logout }>Kirjaudu ulos</NavDropdown.Item>
            </NavDropdown>}

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Header
