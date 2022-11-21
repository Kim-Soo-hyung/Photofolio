import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'

const MySellList = () => {
    const [sellList,setSellList]=useState([]);
    const callSellList = async () => {
        const result = await axios.get(`/api/tradeinfo/buylist?buyer=${loginUser.unickname}`)
        
    }

    useEffect(() => {
        callSellList();
    }, [])
    return (
        <div>MySellList</div>
    )
}

export default MySellList