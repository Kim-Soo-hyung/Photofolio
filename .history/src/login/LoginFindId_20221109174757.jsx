import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Button, Alert,Card, Form, Row, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { Grid, TextField } from '@material-ui/core';
const LoginFindId = () => {
  const [message,SetMessge]=useState('');
    const [form, setForm] = useState({
        uemail:'',
        uname:''
      })
    
      const onChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value
        })
      }
    
      const onSubmit = async (e) => {
        e.preventDefault();
        
        if (form.uemail=== '') {
          alert('이메일을 입력하세요')
          return;
        }
    
        try{
          const result = await axios.get(`/api/user/findid?uemail=${form.uemail}&uname=${form.uname}`);
     
       
          if (result.data === '') {
            setForm({
              ...form,
              uemail:''
            });
            
            SetMessge('검색된 아이디가 없습니다'); 
            //탈퇴 회원

           
          } else {
            
           console.log(result.data);
            SetMessge('아이디는 '+result.data+'입니다'); 
          }
    
        }catch(e){
          if(e) {
            alert('예상치 못한 오류가 발생하였습니다')
          }
        }
    
      }
  return (


    <div>
      <Row className='d-flex justify-content-center my-5'>
        <Card style={{ width: '30rem' }} className="p-3">
          <Form onSubmit={onSubmit}>

         

            <hr />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="email"
                value={form.uemail}
                name="uemail"
                onChange={onChange}
              />
            </Grid>

            <hr />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="name"
                value={form.uname}
                name="uname"
                onChange={onChange}
              />
            </Grid>
            <hr/>

            <Button type="submit" style={{ width: '100%' }}>아이디 찾기</Button>
            {message && <Alert>{message}</Alert>}
          </Form>

          
        </Card>
      </Row>
    </div>
  )
}

export default LoginFindId