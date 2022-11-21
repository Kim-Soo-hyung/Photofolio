import React from 'react'
import pboardInsert from './pboardInsert'
import pboardList from './pboardList'
import pboardRead from './pboardRead'

const pboardPage = () => {
  return (
    <div>
        <Route path="/pboard/list" component={pboardList}/>
        <Route path="/pboard/read:pcode" component={pboardRead}/>
        <Route path="/pboard/insert" component={pboardInsert}/>
    </div>
  )
}

export default pboardPage