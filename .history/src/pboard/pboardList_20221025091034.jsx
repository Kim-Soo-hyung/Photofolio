import axios from 'axios';
import React, { useState } from 'react'
import qs from 'qs'

const PboardList = ({location}) => {
    const [postList,setPostList]=useState([]);
    const search=qs.parse
    const callPostList=async()=>{
    const result=await axios.get(`/api/pboard/list?page=${page}`)    
    }
  return (
    <div>pboardList</div>
  )
}

export default PboardList