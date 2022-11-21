import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Button, Card, Form, Row, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { Grid, TextField } from '@material-ui/core';

const LoginForm = ({ history }) => {
  const [form, setForm] = useState({
    uid: '',
    upass: '',
    ucondition: ''
  })

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.uid === '' || form.upass === '') {
      alert('아이디 비번을 입력하세요.')
      return;
    }

    try{
      const result = await axios.post('/api/user/login', form);

      if (result.data === 0) {
        alert('아이디가 없습니다')
        setForm({
          ...form,
          uid:''
        });
      } else if (result.data === 3) {
        alert('password가 틀렸습니다.');
        setForm({
          ...form,
          upass:''
        });
        //탈퇴 회원
      } else if (result.data === 1) {

        if (!window.confirm('이미 탈퇴한 회원입니다. 회원 복구를 신청하시겠습니까?')) {
          return;
        } else {
          history.push('/login/restore'); 
        }
        //로그인 성공
      } else {
        sessionStorage.setItem("uid", form.uid);
        history.push('/')
      }

    }catch(e){
      if(e) {
        alert('예상치 못한 오류가 발생하였습니다')
      }
    }

  }

  return (
    <div>
      <Row className='d-flex justify-content-center my-5'>
        <Card style={{ width: '30rem' }} className="p-3">
          <Form onSubmit={onSubmit}>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="unickname"
                label="id"
                value={form.uid}
                name="uid"
                autoComplete="unick"
                onChange={onChange}
              />
            </Grid>

            <hr />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="unickname"
                label="password"
                value={form.upass}
                name="upass"
                autoComplete="unick"
                type="password"
                onChange={onChange}
              />
            </Grid>

            <hr />
            <Button type="submit" style={{ width: '100%' }}>로그인</Button>
          </Form>

          <div className='my-3'>
            <Link to="/login/register">회원가입</Link>
          </div>
        </Card>
      </Row>
    </div>
  )
}

export default LoginForm