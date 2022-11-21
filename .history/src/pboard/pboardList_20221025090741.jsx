import axios from 'axios';
import React, { useState } from 'react'

const PboardList = () => {
    const [postList,setPostList]=useState([]);
    const callPostList=async()=>{
    const result=await axios.get(`/api/pboard/list?page=${page}`)    
    }
  return (
    <div>pboardList</div>
  )
}

export default PboardList