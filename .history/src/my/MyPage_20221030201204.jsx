import React from 'react'
import MyInfo from './MyInfo'

const MyPage = () => {
  return (
    <div>
        <Route path="/my/info:uid" component={MyInfo}/>
    </div>
  )
}

export default MyPage