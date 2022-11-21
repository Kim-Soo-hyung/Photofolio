import React, { useState, useEffect } from 'react';

import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from 'axios';
import { Button, Card, Form, Modal, Row } from 'react-bootstrap';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import MyChatList from './MyChatList';

const MyInfo = ({ match, history }) => {
  const { loginUser, setLoginUser } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [pass, setPass] = useState('')
  const [pass1, setPass1] = useState('')
  const [image, setImage] = useState('')
  const uid = match.params.uid;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [form, setForm] = useState({
    uid: uid,
    uname: '',
    uprofile: '',
    file: null
  });




  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }


  const onChangeFile = (e) => {
    setForm({
      ...form,
      file: e.target.files[0],
      uprofile: URL.createObjectURL(e.target.files[0])
    })
    setImage(URL.createObjectURL(e.target.files[0]));
  }


  const callUser = async () => {
    const result = await axios.get(`/api/user/read/${uid}`);
    setForm(result.data);
  }

  //수정하기
  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (!window.confirm('수정한 내용을 반영하시겠습니까?')) return;
    const formData = new FormData();
    formData.append("file", form.file);
    formData.append("uname", form.uname);
    formData.append("uid", uid);
    formData.append("photo", form.photo);

    try{
      await axios.post('/api/user/update', formData);
      alert('회원정보 수정완료!');
    }catch(e){
      if(e) alert('예상치 못한 오류가 발생했습니다.')
    }

    setLoginUser({
      ...loginUser,
      uname: form.uname
    });
    history.push('/user');
  }

  useEffect(() => {
    console.log(history);
    const unblock = history.block('지금 페이지에서 나가게 되면 변경 사항이 저장되지 않습니다.');
    return () => {
        unblock();
    };
}, [history]);

  const onClickUpdatePw = async () => {
    if (pass === '' || pass1 === '' || pass !== pass1) {
      alert('비밀번호와 비밀번호 확인을 입력하세요!');
      return;
    }

    await axios.post('/api/user/update/password',
      { uid: uid, upass: pass });
    alert("비밀번호 변경 완료!");
    handleClose();
    sessionStorage.removeItem('uid');
    history.push('/login');
  }

  useEffect(() => {
    callUser();
  }, [uid]);

  if (!form) return <h1>Loading......</h1>

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch
      </Button>
      <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
      <div className='d-flex justify-content-center mt-5' >
      <Row className='mt-3'>
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


      </Offcanvas.Body>
    </Offcanvas>
      {/* <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Card className="my-5 p-3">
            <Form>
              <Form.Control className="my-3"
                disabled={true}
                value={uid} />
              <Button onClick={handleShow}>비밀번호변경</Button>
              <Form.Control className="my-3"
                onChange={onChange}
                value={form.uname}
                name="uname" />
              <img src={form.uprofile} width={300} />


              <Form.Control className="my-3"
                type="file"
                onChange={onChangeFile} />
              <Button onClick={onSubmitForm}>수정</Button>
            </Form>
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
                <Button variant="primary" onClick={onClickUpdatePw}>
                  비밀번호변경
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        </Offcanvas.Body>
      </Offcanvas> */}
    </>
  );
}


export default MyInfo