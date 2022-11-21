import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import { useEffect } from 'react';
import { Form, Button, Row } from 'react-bootstrap';
import { Card, Grid, TextField } from '@material-ui/core';

const PboardRead = ({ history, match }) => {
  const pcode = match.params.pcode;
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
    formData.append("file", file);
    formData.append("pcode", pcode);
    formData.append("pcontent", pcontent);
    formData.append("ptitle", ptitle);
    formData.append("pprice", pprice);
    formData.append("pwriter", pwriter);
    formData.append("pimage", pimage);
    for (const pair of formData.entries()) {
      console.log(pair[0] + ',' + pair[1])
    }
    try {
      await axios.post('/api/pboard/update', formData);
      alert('수정완료')
    } catch (e) {
      if (e.response === 'ERR_NETWORK') {
        console.log('이미지 파일의 이름에는 특수문자가 들어갈 수 없습니다.')
      }
    }
  }
  useEffect(() => {
    callPostRead();
  }, [])


  return (
    <div>

      <Row className='d-flex justify-content-center my-5'>
        <Card style={{ width: '30rem' }} className="p-3">
          <Form>
            <img src={image || 'https://dummyimage.com/100x100'} alt="빈이미지" width={150} height={150} />
            <Form.Control className='my-3'
              type="file"
              onChange={onChangeFile} />
            <hr />

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={ptitle}
                onChange={onChangeForm}
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
                onChange={onChangeForm}
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
                  onChange={onChangeForm}
                  name="pprice"
                  type='number'
                  autoComplete="pprice"
                />
              </Grid>
              <hr />
            </Grid>
            <div style={{ marginTop: 30 }}>
              <Button onClick={onSubmit_update} style={{ width: '100%', margintTop: 300 }}>상품정보 수정</Button>
            </div>
          </Form>
        </Card>
      </Row>
    </div>
  )
}

export default PboardRead