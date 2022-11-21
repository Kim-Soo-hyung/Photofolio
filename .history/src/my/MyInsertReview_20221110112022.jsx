import { Grid, MenuItem, TextField } from '@material-ui/core';
import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Alert, Button, Card, Form, Row } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';

const MyInsertReview = () => {
  const { loginUser } = useContext(UserContext);
  const [form, setForm] = useState({
    rvcontnet: '',
    receiver: '',
    point: ''
  });


  const { rvcontnet, receiver, potin } = form;

  //등록 form 바꾸기
  const onChangeForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }


  return (
    <Row className='d-flex justify-content-center my-5'>
      <Card style={{ width: '30rem' }} className="p-3">
        <Form>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label=""
              value={loginUser.unickname}
              name="receiver"
              onChange={onChangeForm}
            />
          </Grid>

          <Button onClick={onCheckUid} className='mt-3'>아이디 중복 확인</Button>

          <hr />
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Password"
              helperText="8-10자 영문대소문자와 숫자를 조합"
              FormHelperTextProps={{ style: { fontSize: 15 } }}
              value={upass}
              name="upass"
              autoComplete="upass"
              type="password"
              onChange={onChangeForm}
            />
          </Grid>

          <hr />
          {message && <Alert>{message}</Alert>}
          <Button onClick={onConfirmPassword} className='mt-3'>패스워드 일치 확인</Button>


          <hr />
          <Grid item xs={12}>
            <TextField
              type='date'
              variant="outlined"
              maxLength='6'
              required
              fullWidth
              id="ubirth"
              value={ubirth}
              name="ubirth"
              autoComplete="ubirth"
              onChange={onChange}
            />
          </Grid>



          <hr />
          <Grid item xs={12}>
            <TextField

              variant="outlined"
              required
              fullWidth
              id="uemail"
              label="Email Address"
              helperText="rrri@daum.net or 222iIek@velog.io"
              value={uemail}
              FormHelperTextProps={{ style: { fontSize: 15 } }}
              name="uemail"
              autoComplete="uemail"
              onChange={onChange}
            />
          </Grid>

   
        </Form>
      </Card>
    </Row>
  )
}

export default MyInsertReview