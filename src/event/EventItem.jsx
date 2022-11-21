import React from 'react'
import { Button, ButtonGroup, Card, Col, Container, Nav, Row } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom';

const EventItem = ({ history,eventlist }) => {
  const { ecode, etitle, econtent, ewriter, regDate} = eventlist;

  return (
                <tr style={{cursor:'pointer'}} onClick={()=>history.push(`/event/read/${ecode}`)}>
                <td>{ewriter}</td>
                    <td>{etitle}</td>
                    <td>{econtent}</td>
                    <td>{regDate}</td>
                </tr>
  )
}

export default withRouter(EventItem);