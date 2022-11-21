import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useContext } from 'react';
import { Button, Form, Offcanvas, Row } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import MyChatList from './MyChatList';

const MyInfo = ({ match, history }) => {
  const { loginUser, setLoginUser } = useContext(UserContext);
  const [show, setShow] = useState(true);
  /*   const [pass, setPass] = useState('')
    const [pass1, setPass1] = useState('') */
  const [image, setImage] = useState('')
  const uid = match.params.uid;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const onChange = (e) => {
    setLoginUser({
      ...loginUser,
      [e.target.name]: e.target.value
    });
  }

   // 오직 숫자로 xxx-xxx-xxxx or xxx-xxxx-xxxx
   const checkPhonenumber_submit = (form) => {
    var regExp = /^\d{3}-\d{3,4}-\d{4}$/;
    const result = regExp.test(form);
    if (!result) alert('전화번호 양식에 맞춰 입력해주세요.')
    return result;
  }

  // 아이디: 영어대소문자숫자 + 메일주소: 영어대소문자 +.com or .io 등
  const checkEmail_submit = (form) => {
    var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
    const result = regExp.test(form);
    if (!result) alert('이메일 양식에 맞춰 입력해주세요.');
    return result;
  }

  //닉넴 중복 확인
  const onCheckUnickanme = async (e) => {
    e.preventDefault();
    if (form.unickname === '') {
      alert('닉네임을 입력하세요')
      return;
    }

    const result = await axios.get(`/api/user/chk/${loginUser.unickname}`);
    result.data === 1 ?
      alert('사용가능한 닉네입 입니다')
      :
      alert('닉네임이 중복되었습니다.')
  }




  const onChangeFile = (e) => {
    setLoginUser({
      ...loginUser,
      file: e.target.files[0],
    })
    setImage(URL.createObjectURL(e.target.files[0]));
  }


  const callUser = async () => {
    const result = await axios.get(`/api/user/read/${uid}`);
    setLoginUser(result.data);
    setImage(result.data.uprofile);
  }

  const onSubmitUpdate = async () => {

    if (checkPhonenumber_submit(form.upass) === false) {
      return;
    }

    if (!window.confirm('수정한 내용을 변경하실래요?')) return;
    const formData = new FormData();
    formData.append("uid", uid);
    formData.append("upass", loginUser.upass);
    formData.append("unickname", loginUser.unickname);
    formData.append("uprofile", loginUser.uprofile);
    formData.append("uaddress", loginUser.uaddress);
    formData.append("uemail", loginUser.uemail);
    formData.append("utel", loginUser.utel);
    formData.append("file", loginUser.file);

    try {
      await axios.post('/api/user/update', formData);
      alert('회원정보 수정완료!');
    } catch (e) {
      if (e) alert('예상치 못한 오류가 발생했습니다.')
    }
  }

  const onSubmitDelete = async () => {
    if (!window.confirm('회원을 탈퇴하시겠습니까?')) return;
    const formData = new FormData();
    formData.append("uid", loginUser.uid);
    await axios.post('/api/user/deactivate', formData);
    alert("회원탈퇴 완료!");
    sessionStorage.removeItem('uid');
    history.push('/');
  }

  useEffect(() => {
    callUser();
  }, [uid]);

  if (!loginUser) return <h1>Loading......</h1>

  return (
    <>
          <div className='d-flex justify-content-center mt-5' >
            <Row className='mt-3'>
              <Form style={{ margin: '0px auto' }}>
                <Form.Group className="mb-3" style={{ width: '170px' }}>
                  <Form.Label>NickName</Form.Label>
                  <Form.Control
                    placeholder="NickName"
                    name='unickname'
                    value={loginUser.unickname}
                    onChange={onChange} />
                </Form.Group>

                <Form.Group className="mb-3" style={{ width: '170px' }}>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    placeholder="Password"
                    name='upass'
                    type='password'
                    value={loginUser.upass}
                    readOnly/>
                </Form.Group>

                <Form.Group className="mb-3" style={{ width: '170px' }}>
                  <Form.Label>Tel</Form.Label>
                  <Form.Control type="Tel"
                    name='utel'
                    placeholder="Tel"
                    value={loginUser.utel}
                    onChange={onChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                </Form.Group>

                <Form.Group className="mb-3" style={{ width: '170px' }}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="Email"
                    name='uemail'
                    placeholder="Email"
                    value={loginUser.uemail}
                    onChange={onChange} />
                </Form.Group>

                <Form.Group className="mb-3" style={{ width: '170px' }}>
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
                <img src={image} style={{ width: "350px", height: "350px" }} />

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
    </>
  );
}


export default MyInfo