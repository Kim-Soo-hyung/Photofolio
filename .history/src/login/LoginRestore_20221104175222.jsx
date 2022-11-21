
import { Grid, TextField } from '@material-ui/core';
import { Button, Card, Col, Container, Form, Nav, Navbar, Row } from 'react-bootstrap';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'

import { UserContext } from '../context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SignalCellularNoSimOutlined } from '@material-ui/icons';

const LoginRestore = ({history}) => {
  const { loginUser, setLoginUser } = useContext(UserContext);
  

  const restoreSubmit = async () => {
    if (!window.confirm('회원을 복구 하시겠습니까?')) return;
    const formData = new FormData();
    formData.append("uid", loginUser.uid);
    await axios.post('/api/user/restore', formData);
    alert("회원복구 완료!");
    sessionStorage.removeItem('uid');
    history.push('/');
  }


  if (!loginUser) return <h1>Loading......</h1>



  return (
   
    <Navbar style={{marginTop:300}}  className='fixed-top' bg='secondary' variant="dark">
      <Container>
   
        <Nav >
          {sessionStorage.getItem('uid')}
            
             5573
            
          <Button  onClick={restoreSubmit}>계정복구</Button>
           
          
        </Nav>

      </Container>
    </Navbar>
  )
}

export default LoginRestore