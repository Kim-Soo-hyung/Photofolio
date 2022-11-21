import React, { useContext, useState } from 'react';
import { Button, Offcanvas, Row } from 'react-bootstrap';
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

                        <Button variant='secondary' className='my-5' onClick={() => history.push(`/my/review?receiver=${loginUser.unickname}`)}>
                            내가 받은 리뷰
                        </Button>

                        <Button variant='secondary' className='my-5' onClick={() => history.push(`/my/chat/${loginUser.unickname}`)}>
                            내 채팅
                        </Button>

                        <Button variant='secondary' className='my-5' onClick={() => history.push(`/my/sell?seller=${loginUser.unickname}`)}>
                            내 판매 내역
                        </Button>

                        <Button variant='secondary' className='my-5' onClick={() => history.push(`/my/buy?buyer=${loginUser.unickname}`)}>
                            내 구매 내역
                        </Button>


                    </Row>
                </Offcanvas.Body>
            </Offcanvas>
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className='img26'>
                <img
                    size='10px'
                    className="d-block w-100"
                    src="/image/image26.jpg"
                />
            </div>

            <br />
            <br />
            <br />
            <br />
            <br />
            <Button variant="warning" onClick={handleShow} className="ball">메뉴</Button>




        </div>
    )
}

export default MyMenu

