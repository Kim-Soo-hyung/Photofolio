import axios from 'axios';
import React, { useEffect, useState } from 'react'
import qs from 'qs'
import Pagination from 'react-js-pagination';
import PboardItem from './PboardItem';
import './Pagination.css'
import { Form, Row, Spinner } from 'react-bootstrap';
import { Box, CircularProgress } from '@material-ui/core';

const PboardList = ({ location, history }) => {
    const search = qs.parse(location.search, { ignoreQueryPrefix: true });
    const [postList, setPostList] = useState([]);
    const [total, setTotal] = useState(1);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('');
    const page = parseInt(search.page) || 1;
    const num = 6;
    const [searchType, setSearchType] = useState('제목');


    const callPostList = async () => {
        setLoading(true);
        const result = await axios.get(`/api/pboard/listPageSearch?page=${page}&num=${num}&searchType=${searchType}&keyword=${query}`);
        setPostList(result.data.list);
        setTotal(result.data.total);
        setLoading(false);
    }

    const onkeyDown = (e) => {
        if (e.keyCode === 13) {
            callPostList();
        }
    }


    useEffect(() => {
        callPostList();
        console.log('aaa')
    }, [page])


    //return이 있어야 아래 component를 불러올 수 있음.
    if (loading) return (
        <Spinner animation="border" variant="primary"
            style={{ width: '20rem', height: '20rem', marginTop: '220px' }} />
    )


    return (
        <>

            <select value={searchType}
                style={{ marginTop: 100, marginLeft:1000 }}
                name="searchType"
                onChange={(e) => setSearchType(e.target.value)}
            >
                <option>분류를 선택하세요</option>
                <option>제목</option>
                <option>내용</option>
                <option>제목과 내용</option>
                <option>작성자</option>
            </select>
            <input value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onkeyDown}>
            </input>

            <Row>

                {postList.map(postList =>
                    <PboardItem key={postList.pcode} postList={postList} />
                )}
            </Row>
            <br />
            <br />

            <Pagination
                activePage={page}
                itemsCountPerPage={6}
                totalItemsCount={total}
                pageRangeDisplayed={10}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={(e) => history.push(`/pboard/list?page=${e}`)}
            />
        </>
    )
}

export default PboardList