import React from 'react'
import { Button, ButtonGroup, Card, Col, Container, Nav, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const EventItem = ({ eventlist }) => {
  const { ecode, etitle, econtent, ewriter, regDate} = eventlist;

  return (
                <tr onClick={()=>history.pushState(`/event/read/${ecode}`)}>
                <td>{etitle}</td>
                    <td>{ewriter}</td>
                    <td>{regDate}</td>
                </tr>
  )
}

export default EventItem;