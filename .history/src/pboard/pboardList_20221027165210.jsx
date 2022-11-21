import axios from 'axios';
import React, { useEffect, useState } from 'react'
import qs from 'qs'
import Pagination from 'react-js-pagination';
import PboardItem from './PboardItem';
import './Pagination.css'

const PboardList = ({ location, history }) => {
    const search = qs.parse(location.search, { ignoreQueryPrefix: true });
    const [postList, setPostList] = useState([]);
    const [total, setTotal] = useState(1);
    const page = parseInt(search.page) || 1;
    const num = 2;


    const callPostList = async () => {
        const result = await axios.get(`/api/pboard/list?page=${page}&num=${num}`);
        setPostList(result.data.list);
        setTotal(result.data.total);
    }



    useEffect(() => {
        callPostList();
    }, [page])

    if (!postList) <h1>데이터를 로딩중입니다.</h1>

    return (
        <div>
            {postList.map(postList => <Row>
                <PboardItem key={postList.pcode} postList={postList} />
                </Row>)}
            <Pagination
                activePage={page}
                itemsCountPerPage={2}
                totalItemsCount={total}
                pageRangeDisplayed={10}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={(e) => history.push(`/pboard/list?page=${e}`)}
            />
        </div>
    )
}

export default PboardList