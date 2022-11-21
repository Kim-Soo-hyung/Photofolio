import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { Alert, Button, Form, Row } from 'react-bootstrap';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { UserContext } from '../context/UserContext';
import Swal from 'sweetalert2'

const MyInfo = ({ match, history }) => {
  const { loginUser, setLoginUser } = useContext(UserContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [image, setImage] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const uid = match.params.uid;



  const onChange = (e) => {
    setLoginUser({
      ...loginUser,
      [e.target.name]: e.target.value
    });
  }

  // 오직 숫자로 xxx-xxx-xxxx or xxx-xxxx-xxxx
  const checkPhonenumberSubmit = (loginuser) => {
    var regExp = /^\d{3}-\d{3,4}-\d{4}$/;
    const result = regExp.test(loginuser);
    if (!result) {
      Swal.fire({
        text: "전화번호 양식을 준수해주세요",
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
      })
    }
    return result;
  }

  // 아이디: 영어대소문자숫자 + 메일주소: 영어대소문자 +.com or .io 등
  const checkEmailSubmit = (loginuser) => {
    var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
    const result = regExp.test(loginuser);
    if (!result) {
      Swal.fire({
        text: "이메일 양식을 준수해 주세요",
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
      })
    }
    return result;
  }

  //닉넴 중복 확인
  const onCheckUnickanme = async (e) => {
    e.preventDefault();
    if (loginUser.unickname === '') {
      Swal.fire({
        text: "닉네임을 입력하세요",
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
      })
    }

    const result = await axios.get(`/api/user/check?unickname=${loginUser.unickname}`);
    result.data === 1 ?
      setMessage('사용 가능한 닉네임입니다.')
      :
      setMessage('해당 닉네임은 사용할 수 없습니다')
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

  const onSubmitUpdate = () => {


    if (checkPhonenumberSubmit(loginUser.utel) === false) {
      return;
    }

    if (!checkEmailSubmit(loginUser.uemail)) {
      return;
    }

    Swal.fire({
      text: "정말로 수정하시겠습니까?",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '수정',
      cancelButtonText: '취소'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append("uid", uid);
        formData.append("unickname", loginUser.unickname);
        formData.append("uprofile", loginUser.uprofile);
        formData.append("uaddress", address);
        formData.append("uemail", loginUser.uemail);
        formData.append("utel", loginUser.utel);
        formData.append("file", loginUser.file);

        try {
          await axios.post('/api/user/update', formData);
          Swal.fire({
            text: "수정을 완료하였습니다!",
            icon: 'success',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
          })
        } catch (e) {
          if (e) {
            Swal.fire({
              text: "예상치 못한 오류가 발생하였습니다",
              icon: 'error',
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
            })
          }
        }
      }
    })
  }

  const onSubmitDelete = () => {

    Swal.fire({
      text: "회원을 탈퇴하시겠습니까?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '수정',
      cancelButtonText: '취소'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append("uid", loginUser.uid);
        await axios.post('/api/user/deactivate', formData);
        alert("회원탈퇴 완료!");
        sessionStorage.removeItem('uid');
        history.push('/');
      }
    })
  }

  useEffect(() => {
    callUser();
  }, [uid]);

  if (!loginUser) return <h1>Loading......</h1>

  return (
    <>
      <div className='modal-address'>
        {isPopupOpen && (
          <div>
            <DaumPostcodeEmbed
              style={postCodeStyle} onClose={() => setIsPopupOpen(false)} onComplete={handlePostCode} />
          </div>
        )}
      </div>
      <div className='d-flex justify-content-center mt-5' >
        <Row className='mt-3'>
          <Form style={{ margin: '0px auto' }}>
            <Form.Group className="mb-3" style={{ width: '300px' }}>
              <Form.Label>NickName</Form.Label>
              <Form.Control
                placeholder="닉네임"
                name='unickname'
                value={loginUser.unickname}
                onChange={onChange} />
              {message && <Alert>{message}</Alert>}
              <Button className='mt-3' onClick={onCheckUnickanme}>닉네임 중복확인</Button>
            </Form.Group>

            <Form.Group className="mb-3" style={{ width: '300px' }}>
              <Form.Label>Tel</Form.Label>
              <Form.Control
                name='utel'
                placeholder="Tel"
                value={loginUser.utel}
                onChange={onChange} />
            </Form.Group>
            <Form.Group className="mb-3">
            </Form.Group>

            <Form.Group className="mb-3" style={{ width: '300px' }}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                name='uemail'
                placeholder="Email"
                value={loginUser.uemail}
                onChange={onChange} />
            </Form.Group>

            <Form.Group className="mb-3" style={{ width: '300px' }}>
              <Form.Label>Address</Form.Label>
              <Form.Control
                name='uaddress'
                value={address || loginUser.uaddress}
                onChange={onChange} />
            </Form.Group>

            <Button type='button'
              style={{ marginRight: 60, marginTop: 25 }}
              onClick={() => setIsPopupOpen(true)}>우편번호 검색</Button>
            <Button className='postCode_btn'
              style={{ marginLeft: 60, marginTop: 25 }}
              type='button'
              onClick={() => setIsPopupOpen(false)} >닫기</Button>

            <Form.Control
              className="my-3" style={{ width: '370px' }}
              type="file"
              onChange={onChangeFile}
            />
            <img src={image} style={{ width: "350px", height: "350px", marginLeft: '-30px' }} />

            <div style={{ marginTop: 20, textAlign: 'center' }}>
              <Button className='ff'
                onClick={onSubmitUpdate}>
                정보 변경하기
              </Button>
              <Button className='ff1' onClick={onSubmitDelete}>회원탈퇴</Button>
            </div>
          </Form>
        </Row>
      </div>
    </>
  );
}


export default MyInfo