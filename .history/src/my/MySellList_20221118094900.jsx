import axios from 'axios'
import React, { useEffect } from 'react'

const MySellList = () => {
    const callSellList=async()=>{
        const result=await axios.get(`/api/tradeinfo/buylist?buyer=${buyer}`)
    }

    useEffect(()=>{
callSellList()  ;
    },[])
  return (
    <div>MySellList</div>
  )
}

export default MySellList