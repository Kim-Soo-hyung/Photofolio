import { Card, Grid, TextField } from '@material-ui/core';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup, Form, Row, Spinner } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';

const PboardRead = ({ match,history }) => {
  const pcode = match.params.pcode;
  const { loginUser } = useContext(UserContext);
  const [image, setImage] = useState('');
  const [loading,setLoading]=useState(false);
  const [postRead, setPostRead] = useState({
    ptitle: '',
    pcontent: '',
    pwriter: '',
    pimage: '',
    viewcnt: '',
    regDate: '',
    updateDate: '',
    file: null
  });
  const { ptitle, pcontent, pwriter, pimage, pprice, file } = postRead;


  const callPostRead = async () => {
    setLoading(true);
    const result = await axios.get(`/api/pboard/read/${pcode}`)
    setPostRead(result.data);
    setImage(result.data.pimage);
    setLoading(false);
  }


  const onChangeForm = (e) => {
    setPostRead({
      ...postRead,
      [e.target.name]: e.target.value
    })
  }

  const onChangeFile = (e) => {
    setPostRead({
      ...postRead,
      file: e.target.files[0]
    })
    setImage(URL.createObjectURL(e.target.files[0]))
  }

  const onSubmitUpdate = async (e) => {
    e.preventDefault();
    if (!window.confirm('정말로 수정하시겠습니까?')) return;
    const formData = new FormData();
    console.log(loginUser);
    formData.append("file", file);
    formData.append("pcode", pcode);
    formData.append("pcontent", pcontent);
    formData.append("ptitle", ptitle);
    formData.append("pprice", pprice);
    formData.append("pwriter", pwriter);
    formData.append("pimage", pimage);

    try {
      await axios.post('/api/pboard/update', formData);
      alert('수정완료')
    } catch (e) {

      //파일 크기 제한 조건 달기
      e.message === 'Network Error' ?
        alert('파일의 용량이 250MB를 초과하여 업로드할 수 없습니다.')
        :
        alert('예상치 못한 오류가 발생하였습니다')
    }
  }


  useEffect(() => {
    callPostRead();
  }, [])


  if (loading) return (
    <Spinner animation="border" variant="primary"
        style={{ width: '20rem', height: '20rem', marginTop: '220px' }} />
)

  

  return (
    <div>

      <Row className='d-flex justify-content-center my-5'>
        <Card style={{ width: '30rem' }} className="p-3">
          <Form>
            <img src={image || 'https://dummyimage.com/100x100'} alt="빈이미지" width={300} height={300} />
            <Form.Control className='my-3'
              type="file"
              onChange={onChangeFile} />

            <hr />

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={pwriter}
                readOnly
                label="작성자"
                name="pwriter"
                autoComplete="pwriter"
              />
            </Grid>

            <hr/>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={ptitle}
                onChange={loginUser.unickname === pwriter && onChangeForm}
                label="제목"
                helperText='제목은 50까지로 제한'
                FormHelperTextProps={{ style: { fontSize: 15 } }}
                name="ptitle"
                autoComplete="ptitle"
              />
            </Grid>

            <hr/>
            <Grid item xs={12}>
              <TextField multiline
                minRows={12}
                variant="outlined"
                required
                fullWidth
                value={pcontent}
                onChange={loginUser.unickname === pwriter && onChangeForm}
                label="내용"
                helperText='내용은 300자까지로 제한'
                FormHelperTextProps={{ style: { fontSize: 15 } }}
                name="pcontent"
                autoComplete="pcontent"
              />
              <hr />
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  helperText='원하는 가격을 입력하세요'
                  FormHelperTextProps={{ style: { fontSize: 15 } }}
                  value={pprice}
                  onChange={loginUser.unickname === pwriter && onChangeForm}
                  name="pprice"
                  type='number'
                  autoComplete="pprice"
                />
              </Grid>
              <hr />
            </Grid>
            <div style={{ marginTop: 30 }}>
              {loginUser.unickname === pwriter &&
                <ButtonGroup>
                  <Button onClick={onSubmitUpdate} style={{ marginRight: 120 }}>상품 수정</Button>
                  <Button onClick={onSubmitUpdate} >상품 삭제</Button>
                </ButtonGroup>}
            </div>
             <Button onClick={()=>history.go(-1)}>뒤로가기</Button>
          </Form>
        </Card>
      </Row>
    </div>
  )
}

export default PboardRead