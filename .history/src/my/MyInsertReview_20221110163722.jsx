import { Grid, TextField } from '@material-ui/core';
import { Rating } from '@mui/material';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Button, Card, Form, Row } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';

const MyInsertReview = ({history,match}) => {
  const { loginUser } = useContext(UserContext);
  const [point,setPoint]=useState(5);
  const paycode=match.params.paycode;
  const [form, setForm] = useState({
    rvcontent: '',
    sender: loginUser.unickname,
    receiver:'',
  });
  


  const { rvcontent, receiver,sender } = form;

  //등록 form 바꾸기
  const onChangeForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  console.log(point);
  
  const onSubmitInsert = async () => {
    const formData = new FormData();
    formData.append("rvcontent", rvcontent);
    formData.append("sender", sender);
    formData.append("receiver", receiver);
    formData.append("point", point);
    formData.append("paycode",paycode);


    try {
        await axios.post('/api/review/insert', formData);
        alert('등록성공')
        history.push('/my/menu')
    } catch (e) {

        if (e){
          alert('예상치 못한 오류가 발생하였습니다.')
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
          <p>별점</p><Rating
            emptySymbol="fa fa-star-o fa-2x"
            fullSymbol="fa fa-star fa-2x"
            defaultValue={5}
            value={point}
            onChange={
              (event, newValue) => {
                setPoint(newValue);
              }}
            fractions={5} precision={0.5} max={5}/> 

          <div style={{ marginTop: 30 }}>
                            <Button onClick={onSubmitInsert} style={{ width: '30%', margintTop: 300 }}>리뷰 등록</Button>
                        </div>
        </Form>
      </Card>
    </Row>
  )
}

export default MyInsertReview