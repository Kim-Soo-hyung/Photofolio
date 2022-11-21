import React from 'react'
import { useState } from 'react'

const MyChatList = () => {
  const [userdata,setUserData]=useState({
    sender:"",
    receiver:"",
    connected:false,
    message:''
  })
  return (
    <div>MyChatList</div>
  )
}

export default MyChatList