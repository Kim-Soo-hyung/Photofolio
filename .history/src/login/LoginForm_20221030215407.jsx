import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Button, Card, Form, Row, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { Grid, TextField } from '@material-ui/core';

const LoginForm = ({ history, match }) => {
  const [show, setShow] = useState(false);
  const uid = match.params.uid;
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [form, setForm] = useState({
    uid: '',
    upass: '',
    ucondition: ''
  })
  const onClickChange = async () => {
    if (pass === '' || pass1 === '' || pass !== pass1) {
      alert('비밀번호와 비밀번호 확인을 입력하세요!');
      return;
    }
    await axios.post('/api/user/update/password',
      { uid: uid, upass: pass });
    alert("비빌번호변경완료!");
    handleClose();
    sessionStorage.removeItem('uid');
    history.push('/login');
  }

  const [pass, setPass] = useState('')
  const [pass1, setPass1] = useState('')


  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.uid === '' || form.upass === '') {
      alert('아이디 비번을 입력하세요.')
      return;
    }

    const result = await axios.post('/api/user/login', form);
    if (result.data === 0) {
      alert('아이디가 없습니다')
    } else if (result.data === 3) {
      alert('password가 틀렸습니다.');
    } else if (result.data === 1) {
      if (!window.confirm('이미 탈퇴한 회원입니다. 회원 복구를 신청하시겠습니까?')) {
        return;
      }else{
        history.go(-1); //복구하는 페이지 만들기. history.go('복구페이지')
      }
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
                id="unickname"
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
                id="unickname"
                label="password"
                value={form.upass}
                name="upass"
                autoComplete="unick"
                type="password"
                onChange={onChange}
              />
            </Grid>





            <hr />

            <Button type="submit" style={{ width: '100%' }}>로그인</Button>
          </Form>
          <div className='my-3'>
            <Link to="/login/register">회원가입</Link>


          </div>
        </Card>
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>비밀번호수정</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Control className="my-3"
                placeholder='비밀번호'
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)} />
              <Form.Control
                placeholder='비밀번호확인'
                value={pass1}
                onChange={(e) => setPass1(e.target.value)}
                type="password" />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={onClickChange}>
                비밀번호변경
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </Row>
    </div>
  )
}

export default LoginForm