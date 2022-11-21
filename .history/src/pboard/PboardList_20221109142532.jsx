import { MenuItem, TextField } from '@material-ui/core';
import axios from 'axios';
import qs from 'qs';
import React, { useCallback, useEffect, useState } from 'react';
import { Row, Spinner } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import '../Pagination.css';
import PboardItem from './PboardItem';
import { v4 } from 'uuid'

const PboardList = ({ location, history }) => {
    const [postList, setPostList] = useState(['aaa']);
    const [total, setTotal] = useState(1);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('');
    const [searchType, setSearchType] = useState('제목');
    const search = qs.parse(location.search, { ignoreQueryPrefix: true });
    const page = parseInt(search.page) || 1;
    const num = 6;

    //로딩 on ㅡ> 출력 ㅡ> 로딩 off
    const callPostList = async () => {
        setLoading(true);
        const result = await axios.get(`/api/pboard/listPageSearch?page=${page}&num=${num}&searchType=${searchType}&keyword=${query}`);
        setPostList(result.data.list);
        setTotal(result.data.total);
        setLoading(false);
    }


    //검색 시 목록 출력
    const onkeyDown = (e) => {
        if (e.keyCode === 13) {
            callPostList();
        }
    }




    useEffect(() => {
        callPostList();
    }, [page,searchType,query])


    //로딩 시 progress bar 출력
    if (loading) return (
        <Spinner animation="border" variant="primary"
            style={{ width: '20rem', height: '20rem', marginTop: '220px' }} />
    )


    return (
        <div style={{marginLeft:100}}>

            <TextField style={{ marginTop: 80, marginLeft: 600 }}
                select
                value={searchType}
                name='ugender'
                onChange={(e) => setSearchType(e.target.value)}>
                <MenuItem value='제목'>제목</MenuItem>
                <MenuItem value='내용'>내용</MenuItem>
                <MenuItem value='제목과 내용'>제목과 내용</MenuItem>
                <MenuItem value='작성자'>작성자</MenuItem>
            </TextField>

            <TextField value={query}
                style={{ marginTop: 80 }}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onkeyDown}>
            </TextField>


            <Row style={{marginLeft:90}}>
                {postList.map((postList) =>
                    <PboardItem key={postList.pcode} /* callPlike={callPlike} */ postList={postList} />
                )}
            </Row>
            <br />
            <br />

            {postList.length !== 0 ? <Pagination
                activePage={page}
                itemsCountPerPage={6}
                totalItemsCount={total}
                pageRangeDisplayed={10}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={(e) => history.push(`/pboard/list?page=${e}`)}
            /> : <div style={{ marginTop: 200 }}>
                <h1 style={{ fontSize: 60, color: 'red' }}>해당 검색 결과가 존재하지 않습니다.</h1>
            </div>}
        </div>
    )
}

export default React.memo(PboardList)