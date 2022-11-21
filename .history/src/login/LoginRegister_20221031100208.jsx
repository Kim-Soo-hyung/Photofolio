import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import DaumPostcode from "react-daum-postcode";
import { Grid, TextField } from '@material-ui/core';




const LoginRegister = ({ history }) => {

  const fileInput = useRef(null)
  const [image,setImage]=useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [pass1, setPass1] = useState('')

  //submit 때 해주면 안먹음.
  //비밀번호 유효성 검사




  const checkPassword_submit = (form) => {
    //  8 ~ 10자 영문, 숫자 조합
    var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/
    const result = regExp.test(form);

    return result;
  }

  const checkPhonenumber_submit = (form) => {
    var regExp = /^\d{3}-\d{3,4}-\d{4}$/;

    const result = regExp.test(form);
       result===false ? alert('전화번호 양식에 맞춰 입력해주세요.') : setMessage('');
    return result;
  }

   const checkEmail_submit = (form) => {
    var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i

    const result = regExp.test(form);
         result===false ? alert('이메일 양식에 맞춰 입력해주세요.') : setMessage(''); 
    return result;
  } 

  
    const checkPhonenumber_form = (e) => {
      var regExp = /^\d{3}-\d{3,4}-\d{4}$/;
  
      const result = regExp.test(e.target.value || '');
      !result ? alert('전화번호 양식에 맞춰 입력해주세요.') : setMessage('');
    }
  
    const checkEmail_form = (e) => {
      var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
  
      const result = regExp.test(e.target.value || '');
      !result ? alert('이메일 양식에 맞춰 입력해주세요.') : setMessage('');
    } 




  const checkPassword = (e) => {

    var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/

    console.log('비밀번호 형식이 다릅니다.:: ', regExp.test(e.target.value))
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

  const { uid, upass, uname, uprofile, unickname, uemail, uaddress, ucondition, utel, ugender, ubirth, file,unick } = form;

  const onChange = (e) => {


    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (uid === '' || upass === '' || uname === '') {
      alert('아이디 비밀번호 이름을 입력하세요');
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


     if (!checkEmail_submit(form.uemail)) {
       alert('이메일을 양식대로 써주세요')
      return;
     }
     if (upass === '' || pass1 === '' || upass !== pass1) {
      alert('비밀번호가 다릅니다!');
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

    await axios.post('/api/user/insert', formData);

    alert('등록성공')
    history.push('/login');
  }




  const onChangeFile = (e) => {
    setForm({
      ...form,
      file: e.target.files[0],
    })
    setImage(URL.createObjectURL(e.target.files[0]))

  }


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
    console.log(data)
    console.log(fullAddress)
    console.log(data.zonecode) 
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

      <div>

        <div className='modal-address'>
             {isPopupOpen && (
            <div>
              <DaumPostcode
                style={postCodeStyle} onClose={() => setIsPopupOpen(false)} onComplete={handlePostCode} />
            </div>
          )} 
        </div>
      </div>


      <Row className='d-flex justify-content-center my-5'>
        <Card style={{ width: '30rem' }} className="p-3">
          <Form>


            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="uid"
                label="id"
                value={uid}
                name="uid"
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
                label="Password"
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
    value={pass1}
    name="upass"
    autoComplete="upass"
    type="password"
    onChange={(e) => setPass1(e.target.value)}
  />
</Grid>

<hr/>

          

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="uname"
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
                autoComplete="unick"
                onChange={onChange}
              />
            </Grid>

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
                value={uemail}
                name="uemail"
                autoComplete="uemail"
                onChange={onChange}
              />
            </Grid> 

            <hr />





          <select
              variant="outlined"
              value={ugender}
              name="ugender"

              onChange={onChange}
              className='form-select' placeholder='성별' id="ugender">

              <option>성별</option>

              <option>남자</option>
              <option>여자</option>

            </select>  

        <td style={{ width: '30rem' }}>

              프로필 사진등록
            </td>

            <img src={image} width={100} />

            <Form.Control className='my-3'
              onChange={onChangeFile}
              type="file" />
            <hr /> 


            <Button onClick={onSubmit} type="submit" style={{ width: '100%' }}>회원가입</Button>

          </Form>
        </Card>
      </Row>
    </div>
  )
}

export default LoginRegister