import React from 'react'
import { Button, ButtonGroup, Card, Col, Container, Nav, Row } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom';

const NoticeItem = ({ history, noticelist }) => {
  const { ncode, ntitle, ncontent, nwriter, regDate } = noticelist;

  return (
    <tr style={{ cursor: 'pointer' }} onClick={() => history.push(`/notice/read/${ncode}`)}>
      <td>{nwriter}</td>
      <td>{ntitle}</td>
      <td>{ncontent}</td>
      <td>{regDate}</td>
    </tr>
  )
}

export default withRouter(NoticeItem);