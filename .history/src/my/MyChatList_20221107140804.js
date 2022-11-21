import React from 'react'
import { useState } from 'react'
import { Container } from 'react-bootstrap'
import { over } from 'stompjs'
import SockJS from 'sockjs-client'

const stompClient = null;
const MyChatList = () => {
  const [publicChatList, setPublicChatList] = useState([]);
  const [privateChatList, setPrivateChatList] = useState(new Map());
  const [tab, setTab] = useState("Chat-Room")
  const [userData, setUserData] = useState({
    sender: "",
    receiver: "",
    connected: false,
    message: ''
  })

  const handleUserData = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value

    })
  }

  const registerUser = () => {
    let Sock = new SockJS("http://localhost:8088/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  }

  const onConnected = () => {
    setUserData({
      ...userData,
      connected: true
    })
    stompClient.subscribe('/chatroom/public', onPublicMessageReceived);
    stompClient.subscribe('/user' + userData.username + '/private', onPrivateMessageReceived);
  }

  const onPublicMessageReceived = (payload) => {
    let payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case "JOIN":
        if (!privateChatList.get(payloadData.sender)) {
          privateChatList.set(payloadData.sender, []);
          setPrivateChatList(new Map(privateChatList));
        }
        break;
      case "MESSAGE":
        publicChatList.push(payloadData);
        setPublicChatList([...publicChatList]);
        break;
    }
  }

  const onPrivateMessageReceived = (payload) => {
    let payloadData = JSON.parse(payload.body);
    if (!privateChatList.get(payloadData.sender)) {
      privateChatList.get(payloadData.sender).push(payloadData);
      setPrivateChatList(new Map(privateChatList));
    } else {
      let list = [];
      list.push(payloadData);

      privateChatList.get(payloadData.sender).push(payloadData);
      setPrivateChatList(new Map(privateChatList));

    }
    switch (payloadData.status) {
      case "JOIN":
        break;
      case "MESSAGE":
        publicChatList.push(payloadData);
        setPublicChatList([...publicChatList]);
        break;
    }
  }

  const onError = (e) => {
    console.log(e);
  }


  return (
    <Container>
      {userData.connected ?
        <div className='chat-box'>
          <div className='member-list'>
            <ul>
              <li onClick={() => setTab("Chat-room")} className={`member ${tab === "Chat-room" && "active"}`}>ChatRoom</li>
              {[...privateChatList.keys()].map((name, index) => {
                <li onClick={() => setTab("name")} className={`member ${tab === name && "active"}`} key={index}>
                  {name}
                </li>
              })}
            </ul>
          </div>

          {tab === 'Chat-romm' && <div className='chat-content '>
            <ul className='chat-messages'>
              {[...privateChatList.get(tab)].map((chat, index) => {
                <li className='message' key={index}>
                  {chat.sender !== userData.username && <div className='avatar'>{chat.sender}</div>}
                  <div className='message-data'>
                    {chat.message}
                  </div>
                  {chat.sender !== userData.username && <div className='avatar self'>{chat.sender}</div>}
                </li>
              })}
            </ul>
            <div className='sende-message'>
              <input type='text'
                className='input-message'
                placeholder='enter for public message'
                value={userData.message}
                onChange={handleMessage} />
              <button type='button' className='send-button' onClick={sendPublicMessage}>send</button>

            </div>
          </div>}

          {tab !== 'Chat-romm' && <div className='chat-content '>
            <ul className='chat-messages'>
              {[...privateChatList.keys()].map((chat, index) => {
                <li className='message' key={index}>
                  {chat.sender !== userData.username && <div className='avatar'>{chat.sender}</div>}
                  <div className='message-data'>
                    {chat.message}
                  </div>
                  {chat.sender !== userData.username && <div className='avatar self'>{chat.sender}</div>}
                </li>
              })}
            </ul>
          </div>}
          <div className='sende-message'>
              <input type='text'
                className='input-message'
                placeholder='enter for public message'
                value={userData.message}
                onChange={handleMessage} />
              <button type='button' className='send-button' onClick={sendPublicMessage}>send</button>

            </div>
        </div>
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