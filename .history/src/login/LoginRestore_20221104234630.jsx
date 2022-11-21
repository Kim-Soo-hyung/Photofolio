
import axios from 'axios';
import React, { useContext } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from '../context/UserContext';

const LoginRestore = ({ history }) => {
  const { loginUser, setLoginUser } = useContext(UserContext);


  const restoreSubmit = async () => {
    if (!window.confirm('아이디를 복원하시겠습니까?')) return;

    const formData = new FormData();
    formData.append("uid", loginUser.uid);
    try {
      await axios.post('/api/user/restore', formData);
      alert("회원복구 완료!");
      sessionStorage.removeItem('uid');
      history.push('/');
    } catch (e) {
      if (e) alert('예상치 못한 오류가 발생하였습니다.')
    }
  }

  return (
    <Navbar style={{ marginTop: 300 }} className='fixed-top' bg='secondary' variant="dark">
      <Container>
        <Nav >
          {sessionStorage.getItem('uid')}
          <Button onClick={restoreSubmit}>계정복구</Button>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default LoginRestore