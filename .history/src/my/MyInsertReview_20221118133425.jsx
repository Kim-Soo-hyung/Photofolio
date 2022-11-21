import { Grid, TextField } from '@material-ui/core';
import { Rating } from '@mui/material';
import axios from 'axios';
import qs from 'qs';
import React, { useState } from 'react';
import { Button, Card, Form, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';

const MyInsertReview = ({ history, match, location }) => {
  const search = qs.parse(location.search, { ignoreQueryPrefix: true });
  const seller = search.seller;
  const buyer = search.buyer;
  const [point, setPoint] = useState(5);
  const paycode = match.params.paycode;

  //새로고침을 할 경우 usecontext 변수인 loginUser가 form이 render된 이후에 
  //axios가 발동되고 값이 채워짐. 필요할 때 undefined로 값이 할당되어버리고 안바뀜..
  //그래서 그냥 qs에 더 정보를 추가했음.
  const [form, setForm] = useState({
    rvcontent: '',
    sender: buyer,
    receiver: seller
  });





  const { rvcontent, receiver, sender } = form;

  const onChangeForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const onSubmitInsert = async () => {
    const formData = new FormData();
    formData.append("rvcontent", rvcontent);
    formData.append("sender", sender);
    formData.append("receiver", receiver);
    formData.append("point", point);
    formData.append("paycode", paycode);

    try {
      const result = await axios.post('/api/review/insert', formData);

      if (result.data === 1) {
        Swal.fire({
          text: "등록을 완료하였습니다!",
          icon: 'success',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
        })
        history.push('/my/menu')
      }else{
        Swal.fire({
          text: "결제 내역이 없습니다!",
          icon: 'error',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
        })
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
    <Row className='d-flex justify-content-center my-5'>
      <Card style={{ width: '30rem' }} className="p-3">
        <Form>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
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
              inputProps={
                { readOnly: true, }
              }
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