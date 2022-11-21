import { Grid, TextField } from '@material-ui/core';
import { Rating } from '@mui/material';
import axios from 'axios';
import qs from 'qs';
import React, { useState } from 'react';
import { Button, Card,ButtonGroup, Form, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';

const MyInsertReview = ({ history, match, location }) => {
  const [point, setPoint] = useState(5);
  const paycode = match.params.paycode;
  const search = qs.parse(location.search, { ignoreQueryPrefix: true });
  const seller = search.seller;
  const buyer = search.buyer;
  const pcode = search.pcode;

  const [form, setForm] = useState({
    rvcontent: '',
    sender: buyer,
    receiver: seller
  });

  const { rvcontent, receiver, sender } = form;

  const onChangeForm = (e) => {
    setForm(prev=>({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const onInsert = async () => {
    const formData = new FormData();
    formData.append("rvcontent", rvcontent);
    formData.append("sender", sender);
    formData.append("receiver", receiver);
    formData.append("point", point);
    formData.append("paycode", paycode);
    formData.append("pcode", pcode);

    //review insert
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
      } else {
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
            <ButtonGroup>
              <Button onClick={onInsert} style={{ width: '40%', margintTop: 300,marginRight:90 }}>지금 <br/>등록</Button>
              <Button onClick={() => history.push('/my/menu')} style={{ width: '40%', margintTop: 300 }}>나중에 등록</Button>
            </ButtonGroup>
          </div>
        </Form>
      </Card>
    </Row>
  )
}

export default MyInsertReview