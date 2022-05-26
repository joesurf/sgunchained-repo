import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Header() {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>

          <LinkContainer to='/'>
            <Navbar.Brand>Unchained</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">

            <Nav className="mr-auto">
              <LinkContainer to='/experience'>
                <Nav.Link><i className="fas fa-list-alt"></i> Experience</Nav.Link>
              </LinkContainer>

              <LinkContainer to='/login'>
                <Nav.Link><i className="fas fa-user"></i> Login</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
          
        </Container>
      </Navbar>
    </header>
  )
}

export default Header