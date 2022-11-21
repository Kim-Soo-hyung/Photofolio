import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Pagination from "react-js-pagination";
import { UserContext } from '../context/UserContext';
import '../Pagination.css';
import Swal from 'sweetalert2'

const EreplyList = ({ ecode }) => {
  const { loginUser } = useContext(UserContext);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [ercontent, setErcontent] = useState('');
  const num = 6;

  const callEreply = async () => {
    const result = await axios.get(`/api/ereply/list?ecode=${ecode}&page=${page}&num=${num}`);
    setList(result.data.list);
    setTotal(result.data.total);
  }

  useEffect(() => {
    callEreply();
  }, [page]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (ercontent === '') {
      alert('내용을 입력해 주세요!');
      return;
    }
    const data = {
      ecode: ecode,
      erwriter: loginUser.unickname,
      ercontent: ercontent
    };
    await axios.post('/api/ereply/insert', data);
    setErcontent('');
    callEreply();
    setPage(page);
  }

  const callDeleteEreply = async (ercode) => {

    Swal.fire({
      text: "정말로 삭제하시겠습니까?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '삭제',
      cancelButtonText: '취소'
    }).then(async (result) => {

      if (result.isConfirmed) {

        try {
          await axios.post(`/api/ereply/delete/${ercode}`)
          Swal.fire({
            text: "댓글이 삭제되었습니다",
            icon: 'success',
            confirmButtonColor: '#3085d6',
          })
          callEreply();
        } catch (e) {
          Swal.fire({
            text: "예상치 못한 오류가 발생하였습니다.",
            icon: 'error',
            confirmButtonColor: '#3085d6',
          })
        }

      }
    })
  }


  if (!list) return <h1>Loading......</h1>

  return (
    <div>
      {sessionStorage.getItem('uid') &&
        <Form onSubmit={onSubmit}>
          <Form.Label className='d-flex justify-content-left' style={{ fontSize: 20 }}>
            댓글 입력
          </Form.Label>
          <Form.Control
            class='ereply_content'
            value={ercontent}
            onChange={(e) => setErcontent(e.target.value)}
            placeholder='내용을 입력하세요...' />
        </Form>}

      <hr />
      {list.map(reply =>
        <div class='u_cbox_comment_box u_cbox_type_profile' key={reply.ercode}>
          <div class='u_cbox_area'>
            <div class='u_cbox_info'>
              <span>
                {reply.erwriter}
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
                {/*       <Button>수정</Button> */}
                <Button onClick={() => callDeleteEreply(reply.ercode)}>삭제</Button>
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
        onChange={(e) => setPage(e)} />
    </div>
  )
}

export default EreplyList




