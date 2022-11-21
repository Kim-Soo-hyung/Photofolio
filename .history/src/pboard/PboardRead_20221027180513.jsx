import React from 'react'
import axios from 'axios'
import { useState } from 'react';

const PboardRead = ({ match }) => {
  const pcode = match.params.pcode;
  const [postRead,setPostRead]=useState({});

  const callPostRead = async () => {
    const result = await axios.get(`/api/pboard/read/${pcode}`)
  }


  return (
    <div>

    </div>
  )
}

export default PboardRead