import React from 'react'
import { useContext, useState } from 'react';
import { Button, Form, Offcanvas, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
const MyMenu = ({ history }) => {
    const { loginUser } = useContext(UserContext);
    const [show, setShow] = useState(false);
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
                        <Button variant='secondary' className='my-5 ' onClick={() => history.push(`/my/info/${loginUser.uid}`)}>
                            내 정보
                        </Button>

                        <Button variant='secondary' className='my-5' onClick={() => history.push(`/my/pay/${loginUser.uid}`)}>
                            결제하기
                        </Button>

                        <Button variant='secondary' className='my-5' onClick={() => history.push(`/my/review?receiver=${loginUser.unickname}`)}>
                            내가 받은 리뷰
                        </Button>

                        <Button variant='secondary' className='my-5' onClick={() => history.push(`/my/pass/update`)}>
                            비밀번호 변경
                        </Button>

                    </Row>
                </Offcanvas.Body>
            </Offcanvas>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        
            <br />
            <br />
            <br />
            <br />
        
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className='img20'>
        <img
          sizes='100vw'
          className="d-block w-100"
          src="/image/image20.webp"
        />
      </div>
        
        
        
            <Button onClick={handleShow} className="ball">my menu</Button>
          

            
        </div>
    )
}

export default MyMenu
    
