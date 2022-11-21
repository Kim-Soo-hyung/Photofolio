import React, { useState } from 'react'
import { Button, Card, Form, Row } from 'react-bootstrap';
import { Grid, TextField } from '@material-ui/core';
import axios from 'axios';

const LoginFindPass = ({history}) => {
    const [form,setForm] = useState({
        uid:'',
        uemail:''
    })
    
      const {uid,uemail} =form;

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
    
        const result = await axios.post('/api/user/findpw', form);
        if (result.data === 0) {
          alert('아이디가 없습니다')
        } else {
          sessionStorage.setItem("uid", form.uid);
          history.push('/');
        }
      }
    
  return (
    <div>
        <Row className='d-flex justify-content-center my-5'>
            <Card style={{ width: '30rem' }} className="p-3">
                <Form onSubmit={onSubmit}>
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
                    <Button type="submit" style={{ width: '100%' }}>임시비밀번호 발급</Button>
                </Form>
            </Card>
        </Row>
    </div>
  )
}

export default LoginFindPass