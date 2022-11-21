import { Grid, TextField } from '@material-ui/core';
import { Rating } from '@mui/material';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Button, Card, Form, Row } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import Swal from 'sweetalert2'
import qs from 'qs'
import { useEffect } from 'react';

const MyInsertReview = ({ history, match, location }) => {
  const search = qs.parse(location.search, { ignoreQueryPrefix: true });
  const pwriter = search.pwriter;
  const { loginUser, setLoginUser } = useContext(UserContext);
  const [point, setPoint] = useState(5);
  const paycode = match.params.paycode;
  const [form, setForm] = useState({
    rvcontent: '',
    sender: loginUser.unickname,
    receiver: pwriter,
  });



  const { rvcontent, receiver, sender } = form;

  const onChangeForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  console.log(loginUser.unickname);

  const onSubmitInsert = async () => {
    const formData = new FormData();
    formData.append("rvcontent", rvcontent);
    formData.append("sender", sender);
    formData.append("receiver", receiver);
    formData.append("point", point);
    formData.append("paycode", paycode);

    try {
      await axios.post('/api/review/insert', formData);
      Swal.fire({
        text: "등록을 완료하였습니다!",
        icon: 'success',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
      })
      history.push('/my/menu')
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


  useEffect(() => {
    const result = axios.get(`/api/user/read/${sessionStorage.getItem('uid')}`);
    setLoginUser(result.data);
  }, [])

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
              inputProps={
                { readOnly: true, }
              }
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
              aria-readonly
            />
          </Grid>

          <hr />
          <span style={{ marginRight: 50, fontSize: 20 }}>별점</span><Rating
            emptySymbol="fa fa-star-o fa-2x"
            fullSymbol="fa fa-star fa-2x"
            defaultValue={5}
            value={point}
            onChange={
              (event, newValue) => {
                setPoint(newValue);
              }}
            fractions={5} precision={0.5} max={5} />

          <div style={{ marginTop: 30 }}>
            <Button onClick={onSubmitInsert} style={{ width: '30%', margintTop: 300 }}>리뷰 등록</Button>
          </div>
        </Form>
      </Card>
    </Row>
  )
}

export default MyInsertReview