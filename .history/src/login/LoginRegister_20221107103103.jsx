import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap';
import DaumPostcode from "react-daum-postcode";
import { Grid, MenuItem, TextField } from '@material-ui/core';



const LoginRegister = ({ history }) => {

 const [message,setMessage]=useState('');
  const [image, setImage] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [address, setAddress] = useState('');
  const [pass1, setPass1] = useState('')

  //  8 ~ 10자 영문, 숫자 조합
  const checkPassword_submit = (form) => {
    var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/
    const result = regExp.test(form);
    return result;
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

  const [form, setForm] = useState({
    uid: '',
    upass: '',
    uname: '',
    unickname: '',
    uemail: '',
    utel: '',
    uaddress: '',
    ucondition: '1',
    ugender: '',
    ubirth: '',
    file: null
  })

  const { uid, upass, uname, unickname, uemail, ucondition, utel, ugender, ubirth, file } = form;

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const onSubmitRegister = async (e) => {
    e.preventDefault();
    if (uid === '' || upass === '') {
      alert('아이디 비밀번호를 입력하세요');
      return;
    }

    if (uname === '') {
      alert('이름을 입력하세요')
      return;
    }

    if (checkPassword_submit(form.upass) === false) {
      alert('비밀번호를 양식대로 써주세요')
      return;
    }

    if (checkPhonenumber_submit(form.utel) === false) {
      alert('전화번호를 양식대로 써주세요')
      return;
    }

    if (ugender === "" || ugender === "성별") {
      alert('성별을 선택하세요');
      return;
    }

    if (!checkEmail_submit(form.uemail)) {
      alert('이메일을 양식대로 입력하여 주세요')
      return;
    }

    if (pass1 === '') {
      alert('확인용 비밀번호도 입력하세요')
      return;
    }

    if (upass !== pass1) {
      alert('확인용 비밀번호와 입력한 비밀번호가 다릅니다!');
      return;
    }

    if (!window.confirm('새로운 회원을 등록하실래요?')) return;

    const formData = new FormData();
    formData.append('uid', uid);
    formData.append('upass', upass);
    formData.append('uname', uname);
    formData.append('unickname', unickname);
    formData.append('uemail', uemail);
    formData.append('utel', utel);
    formData.append('uaddress', address);
    formData.append('file', file);
    formData.append('ucondition', ucondition);
    formData.append('ugender', ugender);
    formData.append('ubirth', ubirth);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ',' + pair[1])
    }


    try {
      await axios.post('/api/user/insert', formData);
      alert('등록성공')
      history.push('/login/form')
    } catch (e) {
      if (e.message === 'Request failed with status code 500') {
        alert('이미지 파일의 확장자는 jpg, png만 가능합니다.')
      }
    }

  }

  const onCheckUnickanme = async (e) => {
    e.preventDefault();
    if (form.unickname === '') {
      alert('닉네임을 입력하세요')
      return;
    }

    const result = await axios.get(`/api/user/chk/${form.unickname}`);
    console.log(result);
   result.data === 1 ?
      alert('사용가능한 닉네입 입니다')
   :
      alert('닉네임이 중복되었습니다.')
  }


  const onConfirmPassword=()=>{
    upass !== pass1 ?
      setMessage('비밀번호가 일치하지 않습니다.')
      :
      setMessage('비밀번호가 일치합니다.');
  }


  const onCheckUid = async (e) => {
    e.preventDefault();
    if (form.uid === '') {
      alert('닉네임을 입력하세요')
      return;
    }

    const result = await axios.get(`/api/user/read/${form.uid}`);
    console.log(result);
   result.data === ''' ?
      alert('사용가능한 아이디 입니다')
   :
      alert('아이디가 중복되었습니다.')
  }

  const onChangeFile = (e) => {
    setForm({
      ...form,
      file: e.target.files[0],
    })
    setImage(URL.createObjectURL(e.target.files[0]))

  }


  //주소 받는 API
  const handlePostCode = (data) => {

    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }
    setAddress(fullAddress)
  }

  const postCodeStyle = {
    display: "block",
    position: "absolute",
    top: "10%",
    width: "600px",
    height: "600px",
    padding: "7px",
  };



  return (

    <div>

      <div className='modal-address'>
        {isPopupOpen && (
          <div>
            <DaumPostcode
              style={postCodeStyle} onClose={() => setIsPopupOpen(false)} onComplete={handlePostCode} />
          </div>
        )}
      </div>

      <Row className='d-flex justify-content-center my-5'>
        <Card style={{ width: '30rem' }} className="p-3">
          <Form>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="id"
                value={uid}
                name="uid"
                helperText="15자 이하로 기입"
                FormHelperTextProps={{ style: { fontSize: 15 } }}
                onChange={onChange}
              />
            </Grid>
         
            <Button onClick={onCheckUid} className='mt-3'>아이디 중복 확인</Button>

            <hr />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Password"
                helperText="8-10자 영문대소문자와 숫자를 조합"
                FormHelperTextProps={{ style: { fontSize: 15 } }}
                value={upass}
                name="upass"
                autoComplete="upass"
                type="password"
                onChange={onChange}
              />
            </Grid>

            <hr />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="upass"
                label="confirm Password"
                /*   error={pass1!==upass}
                  helperText={pass1!==upass ? '비밀번호가 일치하지 않습니다.' : '비밀번호가 일치합니다'} */
                value={pass1}
                name="upass"
                autoComplete="upass"
                type="password"
                onChange={(e) => setPass1(e.target.value)}
              />
            </Grid>
            {message && <Alert>{message}</Alert>}
            <Button onClick={onConfirmPassword} className='mt-3'>패스워드 일치 확인</Button>

            <hr />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="uname"
                value={uname}
                name="uname"
                autoComplete="uname"
                onChange={onChange}
              />
            </Grid>

            <hr />
            <Grid item xs={12}>
              <TextField
                type='date'
                variant="outlined"
                maxLength='6'
                required
                fullWidth
                id="ubirth"
                value={ubirth}
                name="ubirth"
                autoComplete="ubirth"
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
                label="unickname"
                value={unickname}
                name="unickname"
                onChange={onChange}
              />
            </Grid>

            <Button className='mt-3' onClick={onCheckUnickanme}>닉네임 중복확인</Button>

            <hr />
            <Grid item xs={12}>
              <TextField
                value={address}
                variant="outlined"
                required
                fullWidth
                id="adresss"
                label="adresss"
                name="uaddress"
                autoComplete="uaddress"
                onChange={onChange}
              />
            </Grid>

            <Button type='button'
              style={{ marginRight: 60, marginTop: 25 }}
              onClick={() => setIsPopupOpen(true)}>우편번호 검색</Button>
            <Button className='postCode_btn'
              style={{ marginLeft: 60, marginTop: 25 }}
              type='button'
              onClick={() => setIsPopupOpen(false)} >닫기</Button>

            <hr />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="utel"
                label="utel"
                value={utel}
                helperText='010-0000-0000 or 010-000-0000'
                FormHelperTextProps={{ style: { fontSize: 15 } }}
                name="utel"
                autoComplete="utel"
                onChange={onChange}
              />
            </Grid>

            <hr />
            <Grid item xs={12}>
              <TextField

                variant="outlined"
                required
                fullWidth
                id="uemail"
                label="Email Address"
                helperText="rrri@daum.net or 222iIek@velog.io"
                value={uemail}
                FormHelperTextProps={{ style: { fontSize: 15 } }}
                name="uemail"
                autoComplete="uemail"
                onChange={onChange}
              />
            </Grid>

            <hr />
            <TextField
              select
              label='성별을 선택하세요'
              fullWidth
              value={ugender}
              name='ugender'
              onChange={onChange}>
              <MenuItem value='성별'>성별</MenuItem>
              <MenuItem value='남자'>남자</MenuItem>
              <MenuItem value='여자'>여자</MenuItem>
            </TextField>

            프로필 사진등록


            <img src={image} width={100} />
            <Form.Control className='my-3'
              onChange={onChangeFile}
              type="file" />
            <hr />
            <Button onClick={onSubmitRegister} type="submit" style={{ width: '100%' }}>회원가입</Button>
          </Form>
        </Card>
      </Row>
    </div>
  )
}

export default LoginRegister