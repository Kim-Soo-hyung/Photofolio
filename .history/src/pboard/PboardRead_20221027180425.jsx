import React from 'react'
import axios from 'axios'

const PboardRead = () => {
  const callPostRead=async()=>{
    const result=await axios.get(`/api/pboard/read/${pcode}`)
  }
  return (
    <div>
      
    </div>
  )
}

export default PboardRead