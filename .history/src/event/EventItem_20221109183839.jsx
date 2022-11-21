import React from 'react'
import { Button, ButtonGroup, Card, Col, Container, Nav, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const EventItem = ({ eventlist }) => {
  const { ecode, etitle, econtent, ewriter, regDate} = eventlist;

  return (
    <Link to={`/event/read/${ecode}`}>
                <tr>
                <td>{etitle}</td>
                    <td>{ewriter}</td>
                    <td>{regDate}</td>
                </tr>
                </Link>

  )
}

export default EventItem;