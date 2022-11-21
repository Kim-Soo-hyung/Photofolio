import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { UserContext } from './context/UserContext';

const HeaderPage = ({ history, location }) => {
  const { loginUser, setLoginUser } = useContext(UserContext);



  const onClick = (e) => {
    e.preventDefault();
    const href = e.target.getAttribute("href")
    history.push(href);
  }

  const onClickLogout = (e) => {
    e.preventDefault();
    sessionStorage.removeItem('uid');
    history.push('/')
  }


  const onChange = (e) => {
    setLoginUser({
      ...loginUser,
      [e.target.name]: e.target.value
    });
  }
  //notice_read_date 대신 readData를 만들어주자. 하는 방식은 옛날 DB했던 방식을 참조.
  const callUserRead = async () => {

    //로그인한 사용자 정보를 읽는다. 
    const result = await axios.get(`/api/user/read/${sessionStorage.getItem('uid')}`);
    setLoginUser(result.data); 
  };


  useEffect(() => {
    //로그인한 사용자가 바뀔 경우 사용자 정보를 다시 읽는다. 
    if (sessionStorage.getItem('uid') !== null) callUserRead();
  }, [sessionStorage.getItem('uid')]);


  const onSubmitDelete = async () => {
    if (!window.confirm('회원을 탈퇴하시겠습니까?')) return;
    const formData = new FormData();
    formData.append("uid", loginUser.uid);
    await axios.post('/api/user/deactivate', formData);
    alert("회원탈퇴 완료!");
    sessionStorage.removeItem('uid');
    history.push('/');
  }
  return (
<div className='fixed'>
    <Navbar className='fixed-top' bg='secondary' variant="dark" collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand onClick={onClick} href="/">물론마켓</Navbar.Brand>
        <Nav className="me-auto"
        navbarScroll>
          <Nav.Link onClick={onClick} href="/about">회사소개</Nav.Link>
          <NavDropdown title="상품" id="navbarScrollingDropdown">
          <NavDropdown.Item onClick={onClick} href="/pboard/list">상품 목록</NavDropdown.Item>
          {sessionStorage.getItem('uid') &&
            <NavDropdown.Item onClick={onClick} href={`/pboard/insert/${loginUser.unickname}`}>상품 등록</NavDropdown.Item>

          }
          </NavDropdown>
         
        </Nav>
        <Nav>
          {sessionStorage.getItem('uid') ?
            <>
              <Nav.Link href={`/my/info/${sessionStorage.getItem('uid')}`} onClick={onClick}>
                {loginUser.unickname}
              </Nav.Link>

              <Nav.Link onClick={onClickLogout}>
                로그아웃
              </Nav.Link>
            </> :
            <Nav.Link onClick={onClick} href='/login/form'>로그인</Nav.Link>
          }

        </Nav>
      </Container>
    </Navbar>
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
      <div className='d-flex justify-content-center mt-5' >
      <Row className='mt-3'>
        <Form style={{ margin: '0px auto' }}>
          <Form.Group className="mb-3" controlId="formBasicEmail" style={{ width: '170px' }}>
            <Form.Label>NickName</Form.Label>
            <Form.Control type="NickName"
              placeholder="NickName"
              name='unickname'
              value={loginUser.unickname}
              onChange={onChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword" style={{ width: '170px' }}>
            <Form.Label>Password</Form.Label>
            <Form.Control placeholder="Password"
              name='upass'
              value={loginUser.upass}
              onChange={onChange} />
          </Form.Group>


          <Form.Group className="mb-3" controlId="formBasicPassword" style={{ width: '170px' }}>
            <Form.Label>Tel</Form.Label>
            <Form.Control type="Tel"
              name='utel'
              placeholder="Tel"
              value={loginUser.utel}
              onChange={onChange} />
          </Form.Group>
          <Form.Group className="mb-3">
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword" style={{ width: '170px' }}>
            <Form.Label>Email</Form.Label>
            <Form.Control type="Email"
              name='uemail'
              placeholder="Email"
              value={loginUser.uemail}
              onChange={onChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword" style={{ width: '170px' }}>
            <Form.Label>Address</Form.Label>
            <Form.Control type="Address"
              name='uaddress'
              placeholder="Address"
              value={loginUser.uaddress}
              onChange={onChange} />
          </Form.Group>

          <Form.Control className="my-3" style={{ width: '370px' }}
            type="file"
            onChange={onChangeFile}
          />
          <img src={loginUser.uprofile} style={{ width: "350px", height: "350px" }} />

          <div style={{ marginTop: 20, textAlign: 'center' }}>
            <Button
              onClick={onSubmit}>
              정보 변경하기
            </Button>
            <Button onClick={onSubmitDelete}>회원탈퇴</Button>
          </div>
        </Form>
      </Row>
    </div>


      </Offcanvas.Body>
    </Offcanvas>
    </div>
  )
}

export default withRouter(HeaderPage)