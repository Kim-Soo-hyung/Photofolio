import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { UserContext } from './context/UserContext';

const HeaderPage = ({ history }) => {
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

    </div>
  )
}

export default withRouter(HeaderPage)