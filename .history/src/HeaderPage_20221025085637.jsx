import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { withRouter } from 'react-router-dom';

const HeaderPage = ({history}) => {
    const onClick = (e) => {
        e.preventDefault();
        const href = e.target.getAttribute("href")
        history.push(href);
      }
  return (
    <>
    <Navbar bg='dark' variant="dark">
      <Container>

        <Navbar.Brand href="/">Crawling</Navbar.Brand>

        <Nav className="me-auto">
          <Nav.Link onClick={onClick} href="/">Home</Nav.Link>
          <Nav.Link onClick={onClick} href="/movie">영화 예약</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  </>
  )
}

export default withRouter(HeaderPage)