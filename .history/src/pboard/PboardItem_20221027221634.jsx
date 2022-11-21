import React from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const PboardItem = ({ postList }) => {
  const { pcode, ptitle, pcontent, pwriter, pimage, viewcnt, regDate, updateDate } = postList;
  return (
      <Col>
        
          <Card style={{ width: '30rem', padding: 20 }}>
          <Card.Body>
            <Card.Img variant="top" src={pimage} width='200' height='200' />
            <Card.Title>{ptitle}</Card.Title>
            <Card.Text>{pcontent}</Card.Text>
            <Button variant="primary">👍{/*  {s[0].likes} */}</Button>

          </Card.Body>
          <Link to={`/pboard/read/${pcode}`}><Button style={{marginLeft:160}} variant='secondary'>자세히 보기</Button></Link>
        </Card>
      
      </Col>

  )
}

export default PboardItem