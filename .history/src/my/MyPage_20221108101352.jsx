import React from 'react'
import { Route } from 'react-router-dom'
import MyChatList from './MyChatList'
import MyInfo from './MyInfo'
import MyPay from './MyPay'

const MyPage = () => {
  return (
    <div>
        <Route path="/my/info/:uid" component={MyInfo}/>
        <Route path="/my/chat/:uid" component={MyChatList}/>
        <Route path="/my/pay/:uid" component={MyPay}/>
    </div>
  )
}

export default MyPage