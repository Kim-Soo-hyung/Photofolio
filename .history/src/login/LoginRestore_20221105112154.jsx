
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';

const LoginRestore = ({ history,match }) => {
 const uid=match.params.uid;


  const restoreSubmit = async () => {
    if (!window.confirm('아이디를 복원하시겠습니까?')) return;

    const formData = new FormData();

   
    formData.append("uid", uid);
    try {
      await axios.post('/api/user/restore', formData);
      alert("아이디 복원 완료!");
      history.push('/login/form');
    } catch (e) {
      if (e) alert('예상치 못한 오류가 발생하였습니다.')
    }
  }



  // 새로고침 막기(조건 부여 가능). 
  useEffect(() => {
 
    window.onbeforeunload = function () {
      return true;
    };
    return () => {
      window.onbeforeunload = null;
      history.push('/login/form');
    };
  }, [])

  return (
    /*모달창 넣기*/
    <Navbar style={{ marginTop: 300 }} className='fixed-top' bg='secondary' variant="dark">
      <Container>
        <Nav >
          <Button onClick={restoreSubmit}>계정복구</Button>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default LoginRestore