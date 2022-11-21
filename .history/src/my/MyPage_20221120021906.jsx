import React from 'react'
import { Route } from 'react-router-dom'
import MyBuyList from './MyBuyList'
import MyChatList from './MyChatList'
import MyChatRead from './MyChatRead'
import MyInfo from './MyInfo'
import MyInsertReview from './MyInsertReview'
import MyMenu from './MyMenu'
import MyPay from './MyPay'
import MyReceiveReview from './MyReceiveReview'
import MySellList from './MySellList'
import MyUpdatePass from './MyUpdatePass'

const MyPage = () => {
  return (
    <div>
        <Route path="/my/info/:uid" component={MyInfo}/>
        <Route path="/my/chat" component={MyChatList} exact/>
        <Route path="/my/chat/read/:pcode" component={MyChatRead}/>
        <Route path="/my/pay/:pcode" component={MyPay}/>
        <Route path="/my/menu" component={MyMenu}/>
        <Route path="/my/review" component={MyReceiveReview} exact/>
        <Route path="/my/review/insert/:paycode" component={MyInsertReview} />
        <Route path="/my/pass/update" component={MyUpdatePass}/>
        <Route path="/my/sell" component={MySellList}/>
        <Route path="/my/buy" component={MyBuyList}/>
    </div>
  )
}

export default MyPage