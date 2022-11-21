import axios from 'axios';
import React, { useEffect, useState } from 'react'
import qs from 'qs'
import Pagination from 'react-js-pagination';
import PboardItem from './PboardItem';
import './Pagination.css'
import { CardGroup, Form, Row, Spinner } from 'react-bootstrap';
import { Box, CircularProgress, MenuItem, TextField } from '@material-ui/core';

const PboardList = ({ location, history }) => {
    const search = qs.parse(location.search, { ignoreQueryPrefix: true });
    const [postList, setPostList] = useState([]);
    const [total, setTotal] = useState(1);
    const [loading, setLoading] = useState(false);
    const page = parseInt(search.page) || 1;
    const num = 6;
    const [query, setQuery] = useState('');
    const [searchType, setSearchType] = useState('제목');

    //로딩 on ㅡ> 출력 ㅡ> 로딩 off
    const callPostList = async () => {
        setLoading(true);
        const result = await axios.get(`/api/pboard/listPageSearch?page=${page}&num=${num}&searchType=${searchType}&keyword=${query}`);
        setPostList(result.data.list);
        setTotal(result.data.total);
        setLoading(false);
    }

    //로딩 빼고 PboardItem에 보내줄 API call
    const callPlike = async () => {
        const result = await axios.get(`/api/pboard/listPageSearch?page=${page}&num=${num}&searchType=${searchType}&keyword=${query}`);
        setPostList(result.data.list);
        setTotal(result.data.total);
    }

    //검색 시 목록 출력
    const onkeyDown = (e) => {
        if (e.keyCode === 13) {
            callPostList();
        }
    }


    useEffect(() => {
        callPostList();
    }, [page])


    //로딩 시 progress bar 출력
    if (loading) return (
        <Spinner animation="border" variant="primary"
            style={{ width: '20rem', height: '20rem', marginTop: '220px' }} />
    )


    return (
        <>
        <div>
         <TextField style={{marginTop:20, float:'left'}}
              select
              value={searchType}
              name='ugender'
              onChange={(e) => setSearchType(e.target.value)}>
              <MenuItem value='분류'>분류를 선택하세요</MenuItem>
              <MenuItem value='제목'>제목</MenuItem>
              <MenuItem value='내용'>내용</MenuItem>
              <MenuItem value='제목과 내용'>제목과 내용</MenuItem>
              <MenuItem value='작성자'>작성자</MenuItem>
            </TextField>
    
            <Form.Control value={query}
                style={{ marginLeft: 30 }}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onkeyDown}>
            </Form.Control>
            </div>

            <Row>
                {postList.map(postList =>
                    <PboardItem key={postList.pcode} callPlike={callPlike} postList={postList} />
                )}
            </Row>
            <br />
            <br />

            {postList.length!==0 ? <Pagination
                activePage={page}
                itemsCountPerPage={6}
                totalItemsCount={total}
                pageRangeDisplayed={10}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={(e) => history.push(`/pboard/list?page=${e}`)}
            /> : <div style={{marginTop:200}}><h1 style={{fontSize:60,color:'red'}}>해당 검색 결과가 존재하지 않습니다.</h1></div>}
        </>
    )
}

export default React.memo(PboardList)