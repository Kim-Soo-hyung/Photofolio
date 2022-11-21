import React from 'react'
import { Button, ButtonGroup, Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const EventItem = ({ eventlist }) => {
  const { ecode, etitle, econtent, ewriter, regDate} = eventlist;

  return (
   
                <tr>
                <td><a href={`/event/read/${ecode}`}>{etitle}</a></td>
                    <td>{ewriter}</td>
                    <td>{regDate}</td>
                </tr>

  )
}

export default EventItem;