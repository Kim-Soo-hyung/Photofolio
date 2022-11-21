import { Card, Grid, TextField } from '@material-ui/core';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PboardRead = ({ match,history }) => {
  const pcode = match.params.pcode;
  const { loginUser } = useContext(UserContext);
  const [image, setImage] = useState('');
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
  const { ptitle, pcontent, pwriter, pimage, viewcnt, pprice, regDate, updateDate, file } = postRead;


  const callPostRead = async () => {
    const result = await axios.get(`/api/pboard/read/${pcode}`)
    setPostRead(result.data);
    setImage(result.data.pimage);
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

  const onSubmit_update = async (e) => {
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

  useEffect(() => {

  

      const unblock = history.block('지금 페이지를 나가게 되면 변경사항이 저장되지 않습니다.');
      return () => {
        unblock();
      };

}, [history]);


  if (!postRead) <h1>로딩중입니다.</h1>

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
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={ptitle}
                onChange={loginUser.unickname === pwriter && onChangeForm}
                label="제목"
                name="ptitle"
                autoComplete="ptitle"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField multiline
                minRows={12}
                variant="outlined"
                required
                fullWidth
                value={pcontent}
                onChange={loginUser.unickname === pwriter && onChangeForm}
                label="내용은 300자 제한"
                name="pcontent"
                autoComplete="pcontent"
              />
              {/*                             <Grid>
                                <input type='hidden' name={pwriter}  value={pwriter}  />
                            </Grid> */}
              <hr />
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  placeholder='가격을 입력하세요'
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
                  <Button onClick={onSubmit_update} style={{ marginRight: 120 }}>상품 수정</Button>
                  <Button onClick={onSubmit_update} >상품 삭제</Button>
                </ButtonGroup>}
              {(loginUser.unickname !== pwriter && sessionStorage.getItem('uid')) &&
                <Link to={`/my/chat`}><Button >채팅하기</Button></Link>}
            </div>
          </Form>
        </Card>
      </Row>
    </div>
  )
}

export default PboardRead