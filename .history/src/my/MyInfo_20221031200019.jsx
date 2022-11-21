import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
const MyInfo = ({ history }) => {
  const { loginUser, setLoginUser } = useContext(UserContext);

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

    try {
      await axios.post('/api/user/update', formData);
      alert('수정완료')
      window.location.replace(`/my/info/${loginUser.uid}`)
    } catch (e) {
      if (e.message === 'Request failed with status code 500') {
        alert('파일의 확장자는 jpg, png여야 합니다.')
      }else{
        alert('예상치 못한 오류가 발생하였습니다')
      }
    }
  
  }

  const onSubmit_deactivate = async () => {
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
            <Button onClick={onSubmit_deactivate}>회원탈퇴</Button>
          </div>
        </Form>
      </Row>
    </div>
  )
}

export default MyInfo