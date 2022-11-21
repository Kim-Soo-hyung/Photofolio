import React from 'react'
import { Button, ButtonGroup, Card, Col, Container, Nav, Row } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom';

const EventItem = ({ history,eventlist }) => {
  const { ecode, etitle, econtent, ewriter, regDate} = eventlist;

  return (
                <tr onClick={()=>history.push(`/event/read/${ecode}`)}>
                <td>{etitle}</td>
                    <td>{ewriter}</td>
                    <td>{regDate}</td>
                </tr>
  )
}

export default withRouter(EventItem);