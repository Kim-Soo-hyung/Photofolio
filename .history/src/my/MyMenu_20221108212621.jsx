import React from 'react'
import { useContext } from 'react';
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
                    <Button onClick={()=>history.push(`/my/info/${loginUser.uid}`)}>
                        정보 변경하기
                    </Button>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}

export default MyMenu