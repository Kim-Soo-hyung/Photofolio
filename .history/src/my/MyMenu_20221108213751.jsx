import React from 'react'
import { useContext,useState } from 'react';
import { Button, Form, Offcanvas, Row } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
const MyMenu = ({history}) => {
    const { loginUser } = useContext(UserContext);
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>my menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Row>
                    <Button variant='info' className='mb-5' onClick={()=>history.push(`/my/info/${loginUser.uid}`)}>
                        내 정보
                    </Button>
                    
                    <Button  onClick={()=>history.push(`/my/pay/${loginUser.uid}`)}>
                        결제하기
                    </Button>
                    </Row>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}

export default MyMenu