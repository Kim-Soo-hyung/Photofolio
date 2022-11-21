import React from 'react'
import { Route } from 'react-router-dom'
import pboardInsert from './PboardInsert'
import pboardList from './PboardList'
import pboardRead from './PboardRead'

const PboardPage = () => {
  return (
    <div>
        <Route path="/pboard/list" component={pboardList}/>
        <Route path="/pboard/read/:pcode" component={pboardRead}/>
        <Route path="/pboard/insert" component={pboardInsert}/>
    </div>
  )
}

export default PboardPage