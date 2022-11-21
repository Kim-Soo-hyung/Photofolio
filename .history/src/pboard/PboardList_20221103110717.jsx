import axios from 'axios';
import React, { useEffect, useState } from 'react'
import qs from 'qs'
import Pagination from 'react-js-pagination';
import PboardItem from './PboardItem';
import './Pagination.css'
import { Row, Spinner } from 'react-bootstrap';
import { Box, CircularProgress } from '@material-ui/core';

const PboardList = ({ location, history }) => {
    const search = qs.parse(location.search, { ignoreQueryPrefix: true });
    const query = search.query || '';
    const [postList, setPostList] = useState([]);
    const [total, setTotal] = useState(1);
    const [loading, setLoading] = useState(false);
    const page = parseInt(search.page) || 1;
    const num = 6;
    let searchType = '';


    const callPostList = async () => {
        setLoading(true);
        const result = await axios.get(`/api/pboard/listPageSearch?page=${page}&num=${num}&searchType=${searchType}&keyword=${query}`);
        setPostList(result.data.list);
        setTotal(result.data.total);
        setLoading(false);
    }

    const onChangeSearchType = (e) => {
        e.target.name = e.target.value;
    }


    useEffect(() => {
        callPostList();
        console.log(postList)
    }, [page])


    //return이 있어야 아래 component를 불러올 수 있음.
    if (loading) return (
        <Spinner animation="border" variant="primary"
            style={{ width: '20rem', height: '20rem', marginTop: '220px' }} />
    )


    return (
        <>
            <Row>
                <select value={searchType}
                    name="searchType" 
                    onChange={onChangeSearchType}>
                    <option>분류를 선택하세요</option>
                    <option>제목</option>
                    <option>내용</option>
                    <option>제목+내용</option>
                    <option>작성자</option>
                </select>
                <textarea value={query} />
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