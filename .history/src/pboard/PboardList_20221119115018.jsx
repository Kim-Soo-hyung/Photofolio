import { MenuItem, TextField } from '@material-ui/core';
import axios from 'axios';
import qs from 'qs';
import React, { useEffect, useState } from 'react';
import { Row, Spinner } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import '../Pagination.css';
import PboardItem from './PboardItem';

const PboardList = ({ location, history }) => {
    const [postList, setPostList] = useState(['aaa']);
    const [total, setTotal] = useState(1);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('');
    const [searchType, setSearchType] = useState('제목');
    const search = qs.parse(location.search, { ignoreQueryPrefix: true });
    const page = parseInt(search.page) || 1;
    const num = 6;

    //loading on ㅡ> render ㅡ> loading off
    const callPostList = async () => {
        setLoading(true);
        const result = await axios.get(`/api/pboard/list?page=${page}&num=${num}&searchType=${searchType}&keyword=${query}`);
        setPostList(result.data.list);
        setTotal(result.data.total);
        setLoading(false);
    }

    //enter ㅡ> new render
    const callFilterdPostList = (e) => {
        if (e.keyCode === 13) {
            callPostList();
        }
    }



    //update plike on PboardItem
    const callPlike = async () => {
        const result = await axios.get(`/api/pboard/list?page=${page}&num=${num}&searchType=${searchType}&keyword=${query}`);
        setPostList(result.data.list);
        setTotal(result.data.total);
    }


    useEffect(() => {
        callPostList();
    }, [page])


    // progress bar when loading
    if (loading) return (
        <Spinner animation="border" variant="primary"
            style={{ width: '20rem', height: '20rem', marginTop: '220px' }} />
    )


    return (
        <div style={{ marginLeft: 100 }}>
            <div className='img4'>
                <img
                    sizes='100vw'
                    className="d-block w-100"
                    src="/image/image.9.jpg"
                />
            </div>
            <div className='img10'>
                <img
                    sizes='100vw'
                    className="d-block w-100"
                    src="/image/image18.jpg"
                />
            </div>

            <TextField className="search" style={{ marginLeft: 900, marginBottom: 50, width: 120 }}
                select
                value={searchType}
                name='searchType'
                onChange={(e) => setSearchType(e.target.value)}>
                <MenuItem className="ppp" value='제목'>제목</MenuItem>
                <MenuItem value='내용'>내용</MenuItem>
                <MenuItem value='제목과 내용'>제목과 내용</MenuItem>
                <MenuItem value='작성자'>작성자</MenuItem>
            </TextField>

            <TextField className="search2" value={query}
                style={{ marginLeft: 15, marginBottom: 50, width: 200 }}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onFetchNew}>
            </TextField>


            <Row style={{ marginLeft: 10 }}>
                {postList.map(postList =>
                    <PboardItem key={postList.pcode} callPlike={callPlike} postList={postList} />

                )}
            </Row>

            <br />
            <br />

            {postList.length !== 0 ? <div style={{ marginRight: 190 }}>
                <Pagination
                    activePage={page}
                    itemsCountPerPage={6}
                    totalItemsCount={total}
                    pageRangeDisplayed={10}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={(e) => history.push(`/pboard/list?page=${e}`)}
                /> </div> : <div style={{ marginTop: 200 }}>
                <h1 style={{ fontSize: 60, color: 'red', marginBottom: 200 }}>해당 검색 결과가 존재하지 않습니다.</h1>
            </div>}
        </div>
    )
}

export default PboardList

