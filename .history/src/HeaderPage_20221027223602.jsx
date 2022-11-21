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

    <Navbar style={{position:'fixed',left:0}} bg='secondary' variant="dark">
      <Container>
        <Navbar.Brand href="/">물론마켓</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={onClick} href="/">Home</Nav.Link>
          <Nav.Link onClick={onClick} href="/pboard/list">상품 목록</Nav.Link>
          <Nav.Link onClick={onClick} href="/pboard/insert">상품 등록</Nav.Link>
        </Nav>
      </Container>
    </Navbar>

  )
}

export default withRouter(HeaderPage)