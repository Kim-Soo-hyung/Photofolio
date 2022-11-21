import { Grid, MenuItem, TextField } from '@material-ui/core';
import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Alert, Button, Card, Form, Row } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';

const MyInsertReview = () => {
  const { loginUser } = useContext(UserContext);
  const [form, setForm] = useState({
    rvcontent: '',
    sender: loginUser.unickname,
    receiver:'',
    point: ''
  });


  const { rvcontent, receiver, point,sender } = form;

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
              label="리뷰 작성자"
              value={sender}
              name="sender"
              aria-readonly
              onChange={onChangeForm}
            />
          </Grid>

          <hr />
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="내용"
              value={rvcontent}
              name="rvcontent"
              onChange={onChangeForm}
            />
          </Grid>

          <hr />
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label='리뷰 대상자'
              value={receiver}
              name="receiver"
              onChange={onChangeForm}
            />
          </Grid>

          <hr/>
          <Grid>
          <TextField
              variant="outlined"
              required
              fullWidth
              label="점수"
              type='number'
              value={point}
              name="point"
              step="0.1"
              onChange={onChangeForm}
            />
          </Grid>

   
        </Form>
      </Card>
    </Row>
  )
}

export default MyInsertReview