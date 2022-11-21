import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import { Grid, TextField } from '@material-ui/core';

const EventRead = ({ match,history }) => {
  const ecode = match.params.ecode;
  const [loading,setLoading]=useState(false);
  const [eventRead, setEventRead] = useState({
    etitle: '',
    econtent: '',
    ewriter: '',
    regDate: '',
    ecode:''
  });
  const { etitle, econtent, ewriter, regDate} = eventRead;

  const callEventRead = async () => {
    setLoading(true);
    const result = await axios.get(`/api/event/read/${ecode}`)
    setEventRead(result.data);
    setLoading(false);
  }

  const onChangeForm = (e) => {
    setEventRead({
      ...eventRead,
      [e.target.name]: e.target.value
    })
  }
  useEffect(() => {
    callEventRead();
  }, [])

  if (loading) return (
    <Spinner animation="border" variant="primary"
        style={{ width: '20rem', height: '20rem', marginTop: '220px' }} />
)
  return (
    <div>
          <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={etitle}
                readOnly
                label="제목"
                onChange={onChangeForm}
                name="etitle"
                autoComplete="etitle"
              />
          </Grid>
          <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={onChangeForm}
                value={econtent}
                readOnly
                label="내용"
                name="econtent"
                autoComplete="econtent"
              />
          </Grid>
          <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={ewriter}
                readOnly
                onChange={onChangeForm}
                label="작성자"
                name="ewriter"
                autoComplete="ewriter"
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

export default EventRead