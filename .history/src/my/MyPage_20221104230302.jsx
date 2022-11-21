import React from 'react'
import { Route } from 'react-router-dom'
import MyInfo from './MyInfo'

const MyPage = () => {
  return (
    <div>
        <Route path="/my/info/:uid" component={MyInfo}/>
    </div>
  )
}

export default MyPage