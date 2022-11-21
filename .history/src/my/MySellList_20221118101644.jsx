import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'

const MySellList = ({location}) => {
    const search = qs.parse(location.search, { ignoreQueryPrefix: true });
    const [sellList, setSellList] = useState([]);
    const [total, setTotal] = useState(1);
    const page = parseInt(search.page) || 1;
    const callSellList = async () => {
        const result = await axios.get(`/api/tradeinfo/buylist?buyer=${loginUser.unickname}?page=${page}`)
        setSellList(result.data);
    }

    useEffect(() => {
        callSellList();
    }, [])
    return (
        <div>

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

export default MySellList