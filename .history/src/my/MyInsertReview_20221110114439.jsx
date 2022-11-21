import { Grid, MenuItem, TextField } from '@material-ui/core';
import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Alert, Button, Card, Form, Row } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import axios from 'axios'

const MyInsertReview = ({history}) => {
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

  const onSubmitInsert = async () => {

       
    const formData = new FormData();
    formData.append("rvcontent", rvcontent);
    formData.append("sender", sender);
    formData.append("receiver", receiver);
    formData.append("point", point);


    try {
        await axios.post('/api/review/insert', formData);
        alert('등록성공')
        sessionStorage.removeItem('unickname');
        history.push('/pboard/list')
    } catch (e) {

        //이미지파일 제한조건 달기
        if (e.message === 'Request failed with status code 500') {
            alert('이미지 파일의 확장자는 jpg, png만 가능합니다.')
        } else {
            alert('알 수 없는 오류가 발생하였습니다.')
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

          <div style={{ marginTop: 30 }}>
                            <Button onClick={onSubmitInsert} style={{ width: '30%', margintTop: 300 }}>리뷰 등록</Button>
                        </div>
        </Form>
      </Card>
    </Row>
  )
}

export default MyInsertReview