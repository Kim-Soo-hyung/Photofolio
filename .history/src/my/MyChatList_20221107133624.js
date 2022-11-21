import React from 'react'
import { useState } from 'react'
import { Container } from 'react-bootstrap'
import {over} from 'stompjs'
import SockJS from 'sockjs-client'

const stompClient=null;
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

  const registerUser=()=>{
    let Sock=new SockJS("http://localhost:8088/ws");
    stompClient=over(Sock);
    stompClient.connect({},onConnected,onError);
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