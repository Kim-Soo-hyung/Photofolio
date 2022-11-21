import React from 'react'
import { Route } from 'react-router-dom'
import MyChatList from './MyChatList'
import MyInfo from './MyInfo'
import MyMenu from './MyMenu'
import MyPay from './MyPay'

const MyPage = () => {
  return (
    <div>
        <Route path="/my/info/:uid" component={MyInfo}/>
        <Route path="/my/chat/:unickname" component={MyChatList}/>
        <Route path="/my/pay/:uid" component={MyPay}/>
        <Route path="/my/menu" component={MyMenu}/>
    </div>
  )
}

export default MyPage