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
    const [eventList, setEventList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(1);
    const page = parseInt(search.page) || 1;
    const num = 5;

    //loading on ㅡ> render ㅡ> loading off
    const callEventList = async () => {
        setLoading(true);
        const result = await axios.get(`/api/event/list?page=${page}&num=${num}&searchType=${searchType}&keyword=${query}`);
        setEventList(result.data.list);
        setTotal(result.data.total);
        setLoading(false);
    }


    //enter ㅡ> fetching
    const onkeyDown = (e) => {
        if (e.keyCode === 13) {
            callEventList();
        }
    }

    useEffect(() => {
        callEventList();
    }, [page])

    if (loading) return (
        <Spinner animation="border" variant="primary"
            style={{ width: '20rem', height: '20rem', marginTop: '220px' }} />
    )

    return (
        <div className='main'>
            <TextField className='search' style={{marginTop:100, marginLeft: 900, marginBottom:50,width:120 }}
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
            className='search2'
                style={{marginLeft:15, marginBottom:50,width:200,marginTop:100 }}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onkeyDown}>
            </TextField>

            <Table striped>
                <thead>
                    <tr >
                        <th>관리자 이름</th>
                        <th>제목</th>
                        <th>내용</th>
                        <th>작성일자</th>
                    </tr>
                </thead>
                <tbody>
                    {eventList.map(eventlist =>
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
                onChange={(e) => history.push(`/event/list?page=${e}`)}
            />
        </div>

    )
}
export default EventList