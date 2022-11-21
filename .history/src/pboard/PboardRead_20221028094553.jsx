import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import { useEffect } from 'react';
import { Form } from 'react-bootstrap';

const PboardRead = ({ match }) => {
  const pcode = match.params.pcode;
  const [postRead, setPostRead] = useState({});
  const { ptitle, pcontent, pwriter, pimage, viewcnt, regDate, updateDate } = postRead;


  const callPostRead = async () => {
    const result = await axios.get(`/api/pboard/read/${pcode}`)
    setPostRead(result.data);
  }

  const onSubmit_update=async()=>{

  }

  useEffect(() => {
    callPostRead();
  }, [])


  return (
    <Form>
      <h1>{ptitle}</h1>
      <h1>{pcontent}</h1>
      <h1>{pwriter}</h1>
      <img src={pimage} alt="빈 이미지" width={150} height={150}/>
    </Form>
  )
}

export default PboardRead