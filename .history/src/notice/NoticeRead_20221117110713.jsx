import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import { Grid, TextField } from '@material-ui/core';

const NoticeRead = ({ match, history }) => {
  const ncode = match.params.ncode;
  const [loading, setLoading] = useState(false);
  const [noticeRead, setNoticeRead] = useState({
    ntitle: '',
    ncontent: '',
    nwriter: '',
    regDate: '',
    ncode: ''
  });
  const { ntitle, ncontent, nwriter, regDate } = noticeRead;

  const callNoticeRead = async () => {
    setLoading(true);
    const result = await axios.get(`/api/notice/read/${ncode}`)
    setNoticeRead(result.data);
    setLoading(false);
  }

  const onChangeForm = (e) => {
    setNoticeRead({
      ...noticeRead,
      [e.target.name]: e.target.value
    })
  }
  useEffect(() => {
    callNoticeRead();
  }, [])

  if (loading) return (<Spinner animation="border" variant="primary"
    style={{ width: '20rem', height: '20rem', marginTop: '220px' }} />)

  return (
    <div style={{ marginTop: 150 }}>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          fullWidth
          value={ntitle}
          readOnly
          label="제목"
          onChange={onChangeForm}
          name="ntitle"
          autoComplete="ntitle"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          fullWidth
          onChange={onChangeForm}
          value={ncontent}
          readOnly
          label="내용"
          name="ncontent"
          autoComplete="ncontent"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          fullWidth
          value={nwriter}
          readOnly
          onChange={onChangeForm}
          label="작성자"
          name="nwriter"
          autoComplete="nwriter"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          fullWidth
          onChange={onChangeForm}
          value={regDate}
          readOnly
          label="작성날짜"
          name="regDate"
          autoComplete="regDate"
        />
      </Grid>
    </div>
  )
}

export default NoticeRead