import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Row, Card, Form, Modal } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SignalCellularNoSimOutlined } from '@material-ui/icons';
const MyInfo = ({ history }) => {
  const { loginUser, setLoginUser } = useContext(UserContext);
  const { uid, upass, unickname, uprofile, utel, uaddress, uemail, file } = loginUser;

  const onChange = (e) => {
    setLoginUser({
      ...loginUser,
      [e.target.name]: e.target.value
    });
  }

  const onChangeFile = (e) => {
    setLoginUser({
      ...loginUser,
      file: e.target.files[0],
      uprofile: URL.createObjectURL(e.target.files[0])
    })

  }

  const onSubmit = async () => {
    if (!window.confirm('수정한 내용을 변경하실래요?')) return;
    const formData = new FormData();
    formData.append("uid", loginUser.uid);
    formData.append("upass", loginUser.upass);
    formData.append("unickname", loginUser.unickname);
    formData.append("uprofile", loginUser.uprofile);
    formData.append("uaddress", loginUser.uaddress);
    formData.append("uemail", loginUser.uemail);
    formData.append("utel", loginUser.utel);
    formData.append("file", loginUser.file);

    await axios.post('/api/user/update', formData);
    alert('회원정보 수정완료!');
    window.location.replace(`/my/info/${loginUser.uid}`)
  }

  const deleteSubmit = async () => {
    if (!window.confirm('회원을 탈퇴하시겠습니까?')) return;
    const formData = new FormData();
    formData.append("uid", loginUser.uid);
    await axios.post('/api/user/deactivate', formData);
    alert("회원탈퇴 완료!");
    sessionStorage.removeItem('uid');
    history.push('/');
  }


  if (!loginUser) return <h1>Loading......</h1>

  return (
    <div className='mysql d-flex justify-content-center mt-5' >
      <Row>
        <Form style={{ margin: '0px auto' }}>
          <Form.Group className="mb-3" controlId="formBasicEmail" style={{ width: '170px' }}>
            <Form.Label>NickName</Form.Label>
            <Form.Control type="NickName"
              placeholder="NickName"
              name='unickname'
              value={loginUser.unickname}
              onChange={onChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword" style={{ width: '170px' }}>
            <Form.Label>Password</Form.Label>
            <Form.Control placeholder="Password"
              name='upass'
              value={loginUser.upass}
              onChange={onChange} />
          </Form.Group>


          <Form.Group className="mb-3" controlId="formBasicPassword" style={{ width: '170px' }}>
            <Form.Label>Tel</Form.Label>
            <Form.Control type="Tel"
              name='utel'
              placeholder="Tel"
              value={loginUser.utel}
              onChange={onChange} />
          </Form.Group>
          <Form.Group className="mb-3">
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword" style={{ width: '170px' }}>
            <Form.Label>Email</Form.Label>
            <Form.Control type="Email"
              name='uemail'
              placeholder="Email"
              value={loginUser.uemail}
              onChange={onChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword" style={{ width: '170px' }}>
            <Form.Label>Address</Form.Label>
            <Form.Control type="Address"
              name='uaddress'
              placeholder="Address"
              value={loginUser.uaddress}
              onChange={onChange} />
          </Form.Group>

          <Form.Control className="my-3" style={{ width: '370px' }}
            type="file"
            onChange={onChangeFile}
          />
          <img src={loginUser.uprofile} style={{ width: "350px", height: "350px" }} />

          <div style={{ marginTop: 20, textAlign: 'center' }}>
            <Button
              onClick={onSubmit}>
              정보 변경하기
            </Button>
            <Button onClick={deleteSubmit}>회원탈퇴</Button>
          </div>
        </Form>
      </Row>
    </div>
  )
}

export default MyInfo