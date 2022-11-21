import React from 'react'
import { Route } from 'react-router-dom'
import NoticeList from './NoticeList'
import NoticeRead from './NoticeRead'


const NoticePage = () => {
  return (
    <div>
        <Route path="/notice/list" component={NoticeList}/>
        <Route path="/notice/read/:ncode" component={NoticeRead}/>
    </div>
  )
}

export default NoticePage