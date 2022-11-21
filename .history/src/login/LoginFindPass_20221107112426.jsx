import React, { useState } from 'react'
import { Button, Card, Form, Row } from 'react-bootstrap';
import { Grid, TextField } from '@material-ui/core';
import axios from 'axios';

const LoginFindPass = ({ history }) => {
  const [form, setForm] = useState({
    uid: '',
    uemail: ''
  })

  const checkEmail_submit = (form) => {
    var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
    const result = regExp.test(form);
    if (!result) alert('이메일 양식에 맞춰 입력해주세요.');
    return result;
  }

  const { uid, uemail } = form;

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    if (uid === '' || uemail === '') {
      alert('아이디와 이메일을 입력하세요.')
      return;
    }

    if (!checkEmail_submit(form.uemail)) {
      return;
    }

    try {
      await axios.post('/api/user/findpw', form);
      alert('입력하신 메일 주소로 임시 재발급 비밀번호가 발급되었습니다.')
      history.push('/login/form')
    } catch (e) {
      if (e) alert('예상치 못한 오류가 발생하였습니다.')
    }
  }

  return (
    <div>
      <Row className='d-flex justify-content-center my-5'>
        <Card style={{ width: '30rem' }} className="p-3">
          <Form>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="id"
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
                id="email"
                label="email"
                value={form.uemail}
                name="uemail"
                onChange={onChange}
              />
            </Grid>
            <hr />
            <Button onClick={onSubmit} style={{ width: '100%' }}>임시비밀번호 발급</Button>
          </Form>
        </Card>
      </Row>
    </div>
  )
}

export default LoginFindPass