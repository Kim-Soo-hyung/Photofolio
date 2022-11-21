import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { UserContext } from '../context/UserContext';
import qs from 'qs';
import { Table } from 'react-bootstrap';
import Pagination from 'react-js-pagination';

const MySellList = ({ location,history }) => {
    const search = qs.parse(location.search, { ignoreQueryPrefix: true });
    const {loginUser}=useContext(UserContext);
    const [sellList, setSellList] = useState(['aaa']);
    const [total, setTotal] = useState(1);
    const page = parseInt(search.page) || 1;
    const callSellList = async () => {
        const result = await axios.get(`/api/tradeinfo/selllist?seller=${loginUser.unickname}&page=${page}`)
        setSellList(result.data.list);
        setTotal(result.data.total);
    }

    useEffect(() => {
        callSellList();
    }, [page])

    return (
        <div>
            <Table striped className='mt-5'>
                <thead>
                    <tr >
                        <th>판매가격</th>
                        <th>판매일자</th>
                    </tr>
                </thead>
                <tbody>
                    {sellList.map(list =>
                        <>
                            <tr key={list.paycode}>
                                <td>{list.payprice}</td>
                                <td>{list.regDate}</td>
                            </tr>
                        </>
                    )}
                </tbody>
            </Table>

            {sellList.length !== 0 ? <Pagination
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