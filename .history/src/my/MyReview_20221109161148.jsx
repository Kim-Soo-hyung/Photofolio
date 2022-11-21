import React from 'react'
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import qs from 'qs';
import { useEffect, useContext, useState, history } from 'react'
import Pagination from 'react-js-pagination';
import '../Pagination.css'

const MyReview = ({ location, match,history }) => {
  const unickname = match.params.unickname;
  const [list, setList] = useState([]);
  const search = qs.parse(location.search, { ignoreQueryPrefix: true });
  const page = parseInt(search.page) || 1;
  const [total,setTotal]=useState(0);

  const callAPI = async () => {
    const result = await axios.get(`/api/review/list?page=${page}&num=6&receiver=${unickname}`);
    setList(result.data.list);
    setTotal(result.data.total);
    
  }

  useEffect(() => {
    callAPI();
  }, [location]);

  if(!list) return(
  <h1>ㅇㅇㅇ</h1>
  )
  return (
    <div className='main'>
      {list.map(list =>
        <Table striped>
          <thead>
            <tr>
              <th>번호</th>
              <th>후기내용</th>
              <th>받는사람</th>
              <th>작성일자</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{list.rvcode}</td>
              <td>{list.rvcontent}</td>
              <td>{list.receiver}</td>
              <td>{list.regDate}</td>
            </tr>
          </tbody>
        </Table>
      )}
  <Pagination
                activePage={page}
                itemsCountPerPage={6}
                totalItemsCount={total}
                pageRangeDisplayed={10}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={(e) => history.push(`/my/review/${unickname}?page=${e}`)}
            />
    </div>

  )
}

export default MyReview