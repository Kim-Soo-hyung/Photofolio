import { Grid, TextField } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { Button, Card, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

const LoginForm = ({ history }) => {
  const [form, setForm] = useState({
    uid: '',
    upass: '',
    ucondition: ''
  })

  const onChangeForm = (e) => {
    setForm(prev=>({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const onLogin = async (e) => {
    e.preventDefault();


    try {
      const result = await axios.post('/api/user/login', form);

      //id x
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

        //password incorrect
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

        //deactivated member
      } else if (result.data === 1) {

        //move to restore
        Swal.fire({
          text: "이미 탈퇴한 회원입니다. 아이디 복원 페이지로 이동하시겠습니까?",
          icon: 'info',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '이동',
          cancelButtonText: '취소'
        }).then(async (result) => {
          if (result.isConfirmed) {
            history.push(`/login/restore/${form.uid}`);
          }
        })

        //login success
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
          <Form onSubmit={onLogin}>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="unickname"
                label="id"
                value={form.uid}
                name="uid"
                onChangeForm={onChangeForm}
              />
            </Grid>

            <hr />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="password"
                value={form.upass}
                name="upass"
                type="password"
                onChangeForm={onChangeForm}
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

