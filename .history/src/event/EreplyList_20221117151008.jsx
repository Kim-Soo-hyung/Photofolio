import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Pagination from "react-js-pagination";
import { UserContext } from '../context/UserContext';
import '../Pagination.css';

const EreplyList = ({ecode}) => {
  const { loginUser } = useContext(UserContext);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [ercontent, setErcontent]=useState('');
  const num=5;

  const callAPI = async() => {
    const result=await axios.get(`/api/ereply/list?ecode=${ecode}&page=${page}&num=${num}`);
    setList(result.data.list);
    setTotal(result.data.total);
  }

  useEffect(()=>{
    callAPI();
  }, [page]);

  const onSubmit = async(e) => {
    e.preventDefault();
    if(ercontent === '') {
      alert('내용을 입력해 주세요!');
      return;
    }
   const data={
      ecode: ecode,
      erwriter: loginUser.unickname,
      ercontent: ercontent
    };
    await axios.post('/api/ereply/insert', data);
    //로그인 안했을 시 댓글 등록 못하게 예외처리하는 방법은 어떻게 할까? 그냥 로그인 안 했으면 버튼 안보이게 막아버렸음.
    setErcontent('');
    callAPI();
    setPage(1);
  }

  const callDeleteEreply = async (ercode) => {
    await axios.post(`/api/ereply/delete/${ercode}`)
  
    callAPI();
  }

  const callUpdateEreply = async () => {
    await axios.post('/api/ereply/update')
    callAPI();
  }

  if(!list) return <h1>Loading......</h1>
  
  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Form.Control 
          class='ereply_content'
          value={ercontent}
          onChange={(e)=>setErcontent(e.target.value)}
          placeholder='내용을 입력하세요...'/>
        {sessionStorage.getItem('uid') && <Button type="submit">등록</Button>}
      </Form>

      <hr/>
      {list.map(reply=>
        <div class='u_cbox_comment_box u_cbox_type_profile' key={reply.ercode}>
          <div class='u_cbox_area'>
            <div class='u_cbox_info'>
              <span>
              ({loginUser.unickname})
              </span>
            </div>
            <div class='u_cbox_text_wrap'>
              <span class='u_cbox_contents'>
                {reply.ercontent}
              </span>
            </div>
            <div class='u_cbox_info_base'>
              <span class='u_cbox_date'>
                {reply.regDate}
              </span>
              <span class='u_cbox_recomm_set'>
                <Button>수정</Button>
                <Button onClick={()=>callDeleteEreply(reply.ercode)}>삭제</Button>
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

export default EreplyList




