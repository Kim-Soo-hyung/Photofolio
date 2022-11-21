import React from 'react'
import { Route } from 'react-router-dom'
import MyChatList from './MyChatList'
import MyInfo from './MyInfo'
import MyInsertReview from './MyInsertReview'
import MyMenu from './MyMenu'
import MyPay from './MyPay'
import MyReceiveReview from './MyReceiveReview'
import MyUpdatePass from './MyUpdatePass'

const MyPage = () => {
  return (
    <div>
        <Route path="/my/info/:uid" component={MyInfo}/>
        <Route path="/my/chat/:uid" component={MyChatList}/>
        <Route path="/my/pay/:pcode" component={MyPay}/>
        <Route path="/my/menu" component={MyMenu}/>
        <Route path="/my/review" component={MyReceiveReview} exact/>
        <Route path="/my/review/insert/:paycode" component={MyInsertReview} />
        <Route path="/my/pass/update" component={MyUpdatePass}/>

    </div>
  )
}

export default MyPage