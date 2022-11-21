import axios from 'axios'
import React, {useEffect, useRef, useState,useContext} from 'react'
import Form from 'react-bootstrap/Form';
import Pagination from "react-js-pagination";
import '../Pagination.css';
import { UserContext } from '../context/UserContext';
import {Button} from 'react-bootstrap';

const NreplyList = ({ncode}) => {
  const { loginUser } = useContext(UserContext);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [ncontent, setNcontent]=useState('');
  const num=5;

  const callAPI = async() => {
    const result=await axios.get(`/api/notice/list?ncode=${ncode}&page=${page}&num=${num}`);
    setList(result.data.list);
    setTotal(result.data.total);
  }

  useEffect(()=>{
    callAPI();
  }, [page]);

  const onSubmit = async(e) => {
    e.preventDefault();
    if(ncontent === '') {
      alert('내용을 입력해 주세요!');
      return;
    }
   const data={
      ncode: ncode,
      nwriter: loginUser.unickname,
      ncontent: ncontent
    };
    await axios.post('/api/notice/insert', data);
    //로그인 안했을 시 댓글 등록 못하게 예외처리하는 방법은 어떻게 할까? 그냥 로그인 안 했으면 버튼 안보이게 막아버렸음.
    setNcontent('');
    callAPI();
    setPage(1);
  }

  const callDeleteEreply = async (ncode) => {
    await axios.post(`/api/notice/delete/${ncode}`)
  
    callAPI();
  }

  const callUpdateEreply = async () => {
    await axios.post('/api/notice/update')
    callAPI();
  }

  if(!list) return <h1>Loading......</h1>
  
  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Form.Control 
          class='ereply_content'
          value={ncontent}
          onChange={(e)=>setNcontent(e.target.value)}
          placeholder='내용을 입력하세요...'/>
        {sessionStorage.getItem('uid') && <Button type="submit">등록</Button>}
      </Form>

      <hr/>
      {list.map(reply=>
        <div class='u_cbox_comment_box u_cbox_type_profile' key={reply.ncode}>
          <div class='u_cbox_area'>
            <div class='u_cbox_info'>
              <span>
              ({loginUser.unickname})
              </span>
            </div>
            <div class='u_cbox_text_wrap'>
              <span class='u_cbox_contents'>
                {reply.ncontent}
              </span>
            </div>
            <div class='u_cbox_info_base'>
              <span class='u_cbox_date'>
                {reply.regDate}
              </span>
              <span class='u_cbox_recomm_set'>
                <Button>수정</Button>
                <Button onClick={()=>callDeleteEreply(reply.ncode)}>삭제</Button>
              </span>
            </div>
          </div>
        </div>
      
        
      )}
      <Pagination
        activePage={page}
        itemsCountPerPage={num}
        totalItemsCount={total}
        pageRangeDisplayed={5}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={(e)=>setPage(e)}/>
    </div>
  )
}

export default NreplyList


