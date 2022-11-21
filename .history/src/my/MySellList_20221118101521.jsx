import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'

const MySellList = () => {
    const [sellList,setSellList]=useState([]);
    const [page,setPage]=useState(1);
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