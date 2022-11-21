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

    try {
      const result = await axios.post('/api/user/login', form);

      //아이디 없음
      if (result.data === 0) {
        Swal.fire({
          text: "아이디가 없습니다",
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
        })
        setForm({
          ...form,
          uid: ''
        });

        //비번 없음
      } else if (result.data === 3) {
        Swal.fire({
          text: "비밀번호가 올바르지 않습니다",
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
        })
        setForm({
          ...form,
          upass: ''
        });

        //탈퇴 회원
      } else if (result.data === 1) {

        //복구
        if (!window.confirm('이미 탈퇴한 회원입니다. 아이디 복원 페이지로 이동하시겠습니까?')) {
          return;
        } else {
          history.push(`/login/restore/${form.uid}`);
        }

        //로그인 성공
      } else {
        sessionStorage.setItem("uid", form.uid);
        history.push('/')
      }

    } catch (e) {
      if (e) {
        Swal.fire({
          text: "예상치 못한 오류가 발생하였습니다",
          icon: 'error',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
        })
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
            <Button type="submit" style={{ width: '30%' }}>로그인</Button>
          </Form>

          <div className='my-3'>
            <Link style={{ marginRight: 110 }} to="/login/register">회원가입</Link>
            <Link style={{ marginRight: 80 }} to="/login/findId">아이디 찾기</Link>
            <Link to="/login/findpass">비밀번호 찾기</Link>
          </div>
        </Card>
      </Row>
    </div>
  )
}

export default LoginForm

