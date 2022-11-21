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
        <div>MySellList</div>
    )
}

export default MySellList