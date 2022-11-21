import { Grid, TextField } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Button, Card, Form, Row } from 'react-bootstrap';
import Swal from 'sweetalert2'

const LoginFindId = () => {
  const [message, SetMessge] = useState('');
  const [form, setForm] = useState({
    uemail: '',
    uname: ''
  })

  const onChangeForm = (e) => {
    setForm(prev=>({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const onFindId = async (e) => {
    e.preventDefault();

    if (form.uemail === '') {
      Swal.fire({
        text: "이메일을 입력하세요",
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
      })
      return;
    }

    //find id 
    try {
      const result = await axios.get(`/api/user/findid?uemail=${form.uemail}&uname=${form.uname}`);

      if (result.data === '') {
        setForm({
          ...form,
          uemail: ''
        });

        SetMessge('검색된 아이디가 없습니다');
        //탈퇴 회원


      } else {
        SetMessge('아이디는 ' + result.data + '입니다');
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
          <Form onSubmit={onFindId}>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="name"
                value={form.uname}
                name="uname"
                onChange={onChangeForm}
              />
            </Grid>
            <hr />

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="email"
                value={form.uemail}
                name="uemail"
                onChange={onChangeForm}
              />
            </Grid>

            <hr />

            <Button type="submit" style={{ width: '40%' }}>아이디 찾기</Button>
            {message && <Alert>{message}</Alert>}
          </Form>


        </Card>
      </Row>
    </div>
  )
}

export default LoginFindId