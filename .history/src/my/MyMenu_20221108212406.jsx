import React from 'react'
import { Button, Form, Offcanvas, Row } from 'react-bootstrap';
const MyMenu = () => {
  return (
    <div>
        <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>my menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>

        </Offcanvas.Body>
        </Offcanvas>
    </div>
  )
}

export default MyMenu