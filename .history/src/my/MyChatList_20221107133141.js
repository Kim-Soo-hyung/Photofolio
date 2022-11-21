import React from 'react'
import { useState } from 'react'
import { Container } from 'react-bootstrap'

const MyChatList = () => {
  const [userData,setUserData]=useState({
    sender:"",
    receiver:"",
    connected:false,
    message:''
  })
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