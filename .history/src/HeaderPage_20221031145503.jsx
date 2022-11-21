import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap'
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

  const getLoinUser = async () => {
    const result = await axios.get(`/api/user/read/${sessionStorage.getItem('uid')}`)
    setLoginUser(result.data);
  }

  const callUserRead = async () => {
    //로그인한 사용자 정보를 읽는다. 
    const result = await axios.get(`/api/user/read/${loginUser.uid}`);
    setUser(result.data); //읽지 않은 메시지 수를 구한다.
    const readDate = result.data.notice_read_date || '';
    //console.log('readDate:', readDate); 
    const q = query(collection(db, 'messages'), where('date', '>', readDate));

    onSnapshot(q, (snapshot) => {
      setCount(snapshot.docs.length);
    }
    )
  };


  useEffect(() => {
    if (sessionStorage.getItem('uid')) {
      getLoinUser();
    }
  }, [sessionStorage.getItem('uid')])

  return (

    <Navbar className='fixed-top' bg='secondary' variant="dark">
      <Container>
        <Navbar.Brand onClick={onClick} href="/">물론마켓</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={onClick} href="/about">회사소개</Nav.Link>
          <Nav.Link onClick={onClick} href="/pboard/list">상품 목록</Nav.Link>
          {sessionStorage.getItem('uid') &&
            <Nav.Link onClick={onClick} href="/pboard/insert">상품 등록</Nav.Link>

          }
        </Nav>
        <Nav>
          {sessionStorage.getItem('uid') ?
            <>
              <Nav.Link href={`/my/info/${loginUser.uid}`} onClick={onClick}>{loginUser.uname}</Nav.Link>
              <Nav.Link onClick={onClickLogout}>로그아웃</Nav.Link>
            </> :
            <Nav.Link onClick={onClick} href='/login/form'>로그인</Nav.Link>
          }

        </Nav>
      </Container>
    </Navbar>

  )
}

export default withRouter(HeaderPage)