import axios from 'axios';
import React, { useState } from 'react'
import qs from 'qs'

const PboardList = ({location}) => {
    const [postList,setPostList]=useState([]);
    const search=qs.parse(location.search, {ignoreQueryPrefix:true});
    const page=search.page || 1;
    const callPostList=async()=>{
    const result=await axios.get(`/api/pboard/list?page=${page}`);
    setPostList(result.data);  
    }
  return (
    <div>pboardList</div>
  )
}

export default PboardList