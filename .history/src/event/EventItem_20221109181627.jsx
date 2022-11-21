import React from 'react'
import { Button, ButtonGroup, Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const EventItem = ({ eventlist }) => {
  const { ecode, etitle, econtent, ewriter, regDate} = eventlist;

  return (
    <>
                <tr>
                <a href={`/event/read/${ecode}`}><th>{etitle}</th></a>
                    <th>{ewriter}</th>
                    <th>{regDate}</th>
                </tr>
     </>
  )
}

export default EventItem;