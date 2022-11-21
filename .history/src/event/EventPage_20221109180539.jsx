import React from 'react'
import { Route } from 'react-router-dom'
import EventList from './EventList'
import EventRead from './EventRead'


const EventPage = () => {
  return (
    <div>
        <Route path="/event/list" component={EventList}/>
        <Route path="/event/read/:ecode" component={EventRead}/>
    </div>
  )
}

export default EventPage