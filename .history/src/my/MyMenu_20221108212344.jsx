import React from 'react'

const MyMenu = () => {
  return (
    <div>
        <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>내 정보</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            
        </Offcanvas.Body>
        </Offcanvas>
    </div>
  )
}

export default MyMenu