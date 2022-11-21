import React from 'react'
import { useState } from 'react'
import { Container } from 'react-bootstrap'
import {over} from 'stompjs'
import SockJS from 'sockjs-client'

const stompClient=null;
const MyChatList = () => {
  const [publicChatList,setPublicChatList]=useState([]);
  const [privateChatList,setPrivateChatList]=useState(new Map());
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

  const onConnected=()=>{
    setUserData({
      ...userData,
      connected:true
    })
    stompClient.subscribe('/chatroom/public',onPublicMessageReceived);
    stompClient.subscribe('/user'+userData.username+'/private',onPrivateMessageReceived);
  }

  const onPublicMessageReceived=(payload)=>{
    let payloadData=JSON.parse(payload.body);
    switch(payloadData.status){
      case "JOIN":
        break;
        case "MESSAGE":
          publicChatList.push(payloadData);
          setPublicChatList([...publicChatList]);
          break;
    }
  }

  const onPrivateMessageReceived=(payload)=>{
    let payloadData=JSON.parse(payload.body);
    switch(payloadData.status){
      case "JOIN":
        break;
        case "MESSAGE":
          publicChatList.push(payloadData);
          setPublicChatList([...publicChatList]);
          break;
    }
  }

  const onError=(e)=>{
    console.log(e);
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
      name=''
      value={userData.username}
      onChange={HandleUsername}
      />
      <button type='button' onClick={registerUser}>
        connect
      </button>
      </div>}
    </Container>
  )
}

export default MyChatList