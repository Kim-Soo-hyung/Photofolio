import { Rating } from '@mui/material';
import axios from 'axios';
import qs from 'qs';
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-js-pagination';
import '../Pagination.css';

const MyReceiveReview = ({ location,history }) => {

  const [list, setList] = useState(['aaa']);
  const search = qs.parse(location.search, { ignoreQueryPrefix: true });

  const unickname = search.receiver
  const page = parseInt(search.page) || 1;
  const [total, setTotal] = useState(0);

  const callAPI = async () => {
    const result = await axios.get(`/api/review/list?page=${page}&num=6&receiver=${unickname}`);
    setList(result.data.list);
    setTotal(result.data.total);
  }

  useEffect(() => {
    callAPI();
  }, [location]);

  

  if (!list) return (
    <h1 style={{marginTop:120}}>데이터를 불러오는 데 오류가 발생했습니다.</h1>
  )
  return (
    <div className='main'>
      <Table striped>
        <thead>
          <tr >
            <th>후기내용</th>
            <th>보낸사람</th>
            <th>작성일자</th>
            <th>평점</th>

          </tr>
        </thead>
        <tbody>
          {list.map(list =>
            <>
              <tr key={list.rvcode}>
                <td>{list.rvcontent}</td>
                <td>{list.sender}</td>
                <td>{list.regDate}</td>
                <td>  <Rating
                emptySymbol="fa fa-star-o fa-2x"
                fullSymbol="fa fa-star fa-2x"
                value={list.point}
                readOnly
                fractions={5} precision={0.5} max={5} /></td>
              </tr>

            </>
          )}
        </tbody>
      </Table>
      

      {list.length !== 0 ? <Pagination
                activePage={page}
                itemsCountPerPage={6}
                totalItemsCount={total}
                pageRangeDisplayed={10}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={(e) => history.push(`/my/review?receiver=${unickname}&page=${e}`)}
            /> : <div style={{ marginTop: 200 }}>
                <h1 style={{ fontSize: 60, color: 'red' }}>해당 검색 결과가 존재하지 않습니다.</h1>
            </div>}
    </div>

  )
}

export default MyReceiveReview