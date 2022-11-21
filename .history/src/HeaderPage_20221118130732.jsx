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

  const onClickLogout = async(e) => {
    e.preventDefault();
await axios.post(`/api/user/logout`);
    sessionStorage.removeItem('uid');
    history.push('/')
  }


  const callUserRead = async () => {

    //fetch loginUser info
    const result = await axios.get(`/api/user/read/${sessionStorage.getItem('uid')}`);
    setLoginUser(result.data);
  };


  useEffect(() => {

    //refetch loginUser info when it changes 
    if (sessionStorage.getItem('uid') !== null) callUserRead();
  }, [sessionStorage.getItem('uid')]);


  return (
    <div className='fixed'>
      <Navbar className='fixed-top' bg='secondary' variant="dark" collapseOnSelect expand="lg">
        <Container>
          <Navbar.Brand className='box13' onClick={onClick} href="/">물론마켓</Navbar.Brand>
          <Nav className="me-auto"
            navbarScroll>
            <Nav.Link className='box13' onClick={onClick} href="/about">회사소개</Nav.Link>
            <NavDropdown title="상품" id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={onClick} href="/pboard/list">상품 목록</NavDropdown.Item>
              {sessionStorage.getItem('uid') &&
                <NavDropdown.Item onClick={onClick} href={`/pboard/insert/${loginUser.unickname}`}>상품 등록</NavDropdown.Item>

              }
            </NavDropdown>

            <Nav.Link className='box13' href={`/notice/list`} onClick={onClick}>
              공지사항
            </Nav.Link>
            <Nav.Link className='box13' href={`/event/list`} onClick={onClick}>
              이벤트
            </Nav.Link>
          </Nav>
          <Nav>
           
            {sessionStorage.getItem('uid') ?
              <>
                <Nav.Link href={`/my/menu`} onClick={onClick}>
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