import { Card, Grid, TextField } from '@material-ui/core';
import { Rating } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup, Form, Row, Spinner } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';

const PboardRead = ({ match, history }) => {
  const pcode = match.params.pcode;
  const { loginUser } = useContext(UserContext);
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [postRead, setPostRead] = useState({
    ptitle: '',
    pcontent: '',
    pwriter: '',
    plike: '',
    pimage: '',
    viewcnt: '',
    regDate: '',
    pname: '',
    upoint: '',
    file: null
  });
  const { ptitle, upoint, pcontent, pwriter, pimage, pprice, pname, plike, file } = postRead;


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
    formData.append("pname", pname);

    try {
      await axios.post('/api/pboard/update', formData);
      Swal.fire({
        text: "수정을 완료하였습니다.",
        icon: 'success',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
      })
    } catch (e) {
      //파일 크기 제한 조건 달기
      e.message === 'Network Error' ?
        Swal.fire({
          text: '파일의 용량이 250MB를 초과하여 업로드할 수 없습니다.',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
        })
        :
        Swal.fire({
          text: '예상치 못한 오류가 발생하였습니다',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
        })
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

            <hr />
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
            <hr />
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
            </Grid>

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
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                helperText='상품명은 30자까지로 제한'
                label='상품명'
                FormHelperTextProps={{ style: { fontSize: 15 } }}
                value={pname}
                onChange={loginUser.unickname === pwriter && onChangeForm}
                name="pname"
              />
            </Grid>
            <hr />

            {upoint ? <>
              <span style={{ marginRight: 50, fontSize: 20 }}>별점</span>
              <Rating
                emptySymbol="fa fa-star-o fa-2x"
                fullSymbol="fa fa-star fa-2x"
                value={upoint}
                readOnly
                fractions={5} precision={0.5} max={5} />({upoint})
            </>
              : <h1>거래 이력이 없습니다.</h1>}

            <div style={{ marginTop: 30 }}>
              {loginUser.unickname === pwriter &&
                <ButtonGroup>
                  <Button onClick={onSubmitUpdate} style={{ marginRight: 120 }}>상품 수정</Button>
                  <Button onClick={onSubmitUpdate} >상품 삭제</Button>
                </ButtonGroup>}
            </div>
            <Button onClick={() => history.go(-1)}>뒤로가기</Button>
          </Form>
        </Card>
      </Row>
    </div>
  )
}

export default PboardRead