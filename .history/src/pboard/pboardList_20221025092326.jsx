import axios from 'axios';
import React, { useEffect, useState } from 'react'
import qs from 'qs'

const PboardList = ({location}) => {
    const search=qs.parse(location.search, {ignoreQueryPrefix:true});
    const [postList,setPostList]=useState([]);
    const page=parseInt(search.page) || 1;


    const callPostList=async()=>{
    const result=await axios.get(`/api/pboard/list?page=${page}`);
    setPostList(result.data);  
    }

    useEffect(()=>{
        callPostList();
    },[])

  return (
    <div>
        {postList.map(postList=><pboardItem postList={postList}/>)}
    </div>
  )
}

export default PboardList