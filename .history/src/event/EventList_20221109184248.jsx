import React, { useEffect, useState } from 'react'
import { Row, Spinner, Table } from 'react-bootstrap';
import qs from 'qs'
import axios from 'axios';
import EventItem from './EventItem';
import Pagination from 'react-js-pagination';
import { MenuItem, TextField } from '@material-ui/core';

const EventList = ({ location, history }) => {
    const search = qs.parse(location.search, { ignoreQueryPrefix: true });
    const [query, setQuery] = useState('');
    const [searchType, setSearchType] = useState('제목');
    const [eventlist, setEventList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(1);
    const page = parseInt(search.page) || 1;
    const num = 5;

    //로딩 on ㅡ> 출력 ㅡ> 로딩 off
    const callEventList = async () => {
        setLoading(true);
        const result = await axios.get(`/api/event/listPageSearch?page=${page}&num=${num}&searchType=${searchType}&keyword=${query}`);
        setEventList(result.data.list);
        setTotal(result.data.total);
        setLoading(false);
    }


    //검색 시 목록 출력
    const onkeyDown = (e) => {
        if (e.keyCode === 13) {
            callEventList();
        }
    }

    useEffect(() => {
        callEventList();
    }, [page])

    if (!eventList) <h1>ㅇㅇㅇ</h1>/* <Spinner animation="border" variant="primary"
        style={{ width: '20rem', height: '20rem', marginTop: '220px' }} /> */

    return (
        <div className='main'>
            <TextField style={{ marginTop: 80, marginLeft: 800 }}
                select
                value={searchType}
                name='ugender'
                onChange={(e) => setSearchType(e.target.value)}>
                <MenuItem value='제목' style={{}}>제목</MenuItem>
                <MenuItem value='내용'>내용</MenuItem>
                <MenuItem value='작성자'>작성자</MenuItem>
                <MenuItem value='작성날짜'>작성날짜</MenuItem>
            </TextField>

            <TextField value={query}
                style={{ marginTop: 80 }}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onkeyDown}>
            </TextField>

            <Table striped>
                <thead>
                    <tr >
                        <th>번호</th>
                        <th>후기내용</th>
                        <th>작성일자</th>
                    </tr>
                </thead>
                <tbody>
                {eventlist.map(eventlist =>
                <>
                    <EventItem key={eventlist.ecode} eventlist={eventlist} />
                    </>
                )}
                 </tbody>
            </Table>
            <br />
            <br />

            <Pagination
                activePage={page}
                itemsCountPerPage={6}
                totalItemsCount={total}
                pageRangeDisplayed={10}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={(e) => history.push(`/event/listPageSearch?page=${e}`)}
            />
        </div>

    )
}
export default EventList