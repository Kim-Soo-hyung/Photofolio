import React from 'react'
import { useState } from 'react'
import { Container } from 'react-bootstrap'
import {over} from 'stompjs'
import SockJS from 'sockjs-client'

const MyChatList = () => {
  const [userData,setUserData]=useState({
    sender:"",
    receiver:"",
    connected:false,
    message:''
  })

  const handleUserData=(e)=>{
    setUserData({
      ...userData,
      [e.target.name]:e.target.value

    })
  }


  return (
    <Container>
      {userData.connected ?
      <div></div>
    :
    <div className='register'>
      <input
      id='user-name'
      placeholder='Enter the user name'
      value={userData.username}
      onChange={HandleUsername}
      />
      <button type='button' onClick={registeruser}>
        connect
      </button>
      </div>}
    </Container>
  )
}

export default MyChatList