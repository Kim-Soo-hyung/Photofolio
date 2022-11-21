import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useContext } from 'react';
import { Button, Form,Offcanvas } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';

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
              onClick={onSubmitUpdate}>
              정보 변경하기
            </Button>
            <Button onClick={onSubmitDelete}>회원탈퇴</Button>
          </div>
        </Form>
      </Row>
    </div>


      </Offcanvas.Body>
    </Offcanvas>
    </>
  );
}


export default MyInfo