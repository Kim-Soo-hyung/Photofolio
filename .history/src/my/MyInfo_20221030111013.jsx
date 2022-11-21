import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Row, Card, Form, Modal } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SignalCellularNoSimOutlined } from '@material-ui/icons';
const MyInfo = ({ match, history }) => {
/*   const { loginUser, setLoginUser } = useContext(UserContext); */
/*   const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true); */

  const uid = match.params.uid;
  const [form, setForm] = useState({
    uid: uid,
    upass: '',
    unickname: '',
    uprofile: '',
    uaddress: '',
    uemail: '',
    utel:'',
    file: null,
  });
 
  const {upass, unickname, uprofile, utel, uaddress,uemail, file} = form;

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
      uprofile:URL.createObjectURL(e.target.files[0])
    })

  }
    const callUser = async () => {
    const result = await axios.get(`/api/user/read/test1`);
    setForm({
      ...result.data,
      uprofile: result.data.uprofile || '/image/a6.png'
    });
   
  }

  const onSubmit = async () => {
    if (!window.confirm('수정한 내용을 변경하실래요?')) return;
    const formData = new FormData();
    formData.append("uid", form.uid);
    formData.append("upass", form.upass);
    formData.append("unickname", form.unickname);
    formData.append("uprofile", form.uprofile);
    formData.append("uaddress", form.uaddress);
    formData.append("uemail", form.uemail);
    formData.append("utel", form.utel);
    formData.append("file", form.file);
    for(var pair of formData.entries()){
      console.log(pair[0]+','+pair[1])
    }
   await axios.post('/api/user/update',formData);
    alert('회원정보 수정완료!');
  }

  const deleteSubmit = async() => {
    if(!window.confirm('회원을 탈퇴하시겠습니까?')) return;
    const formData=new FormData();
    formData.append("uid", form.uid);
    for(var pair of formData.entries()){
      console.log(pair[0]+','+pair[1])
    }
    await axios.post('/api/user/deactivate', formData);
    alert("회원탈퇴 완료!");
   /*  history.push('/'); */
  }

  useEffect(() => {
    callUser();
  }, [uid]);

  if (!form) return <h1>Loading......</h1>

  return (
    <div className='mysql d-flex justify-content-center' >
      <Row>
        <Form style={{ margin: '0px auto' }}>
          <Form.Group className="mb-3" controlId="formBasicEmail" style={{ width: '170px' }}>
            <Form.Label>NickName</Form.Label>
            <Form.Control type="NickName" 
              placeholder="NickName"
              name='unickname'
              value={form.unickname} 
              onChange={onChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword" style={{ width: '170px' }}>
            <Form.Label>Password</Form.Label>
            <Form.Control placeholder="Password"
              name='upass'
              value={form.upass}
              onChange={onChange} />
          </Form.Group>


          <Form.Group className="mb-3" controlId="formBasicPassword" style={{ width: '170px' }}>
            <Form.Label>Tel</Form.Label>
            <Form.Control type="Tel" 
              name='utel'
              placeholder="Tel"
              value={form.utel}
              onChange={onChange} />
          </Form.Group>
          <Form.Group className="mb-3">
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword" style={{ width: '170px' }}>
            <Form.Label>Email</Form.Label>
            <Form.Control type="Email" 
            name='uemail'
            placeholder="Email" 
            value={form.uemail}
            onChange={onChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword" style={{ width: '170px' }}>
            <Form.Label>Address</Form.Label>
            <Form.Control type="Address" 
            name='uaddress'
            placeholder="Address" 
            value={form.uaddress}
            onChange={onChange} />
          </Form.Group>

          <Form.Control className="my-3" style={{ width: '370px' }}
            type="file"
            onChange={onChangeFile} 
             />
          <img src={form.uprofile} style={{ width: "350px", height: "350px" }} />

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