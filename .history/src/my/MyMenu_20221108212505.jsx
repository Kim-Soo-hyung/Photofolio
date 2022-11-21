import React from 'react'
import { useContext } from 'react';
import { Button, Form, Offcanvas, Row } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
const MyMenu = () => {
    const {loginUser}=useContext(UserContext);
  return (
    <div>
        <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>my menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <Button onClick={onSubmitUpdate}>
                    정보 변경하기
                  </Button>
        </Offcanvas.Body>
        </Offcanvas>
    </div>
  )
}

export default MyMenu