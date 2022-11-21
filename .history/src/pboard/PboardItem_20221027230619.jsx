import React from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const PboardItem = ({ postList }) => {
  const { pcode, ptitle, pcontent, pwriter, pimage, viewcnt, regDate, updateDate } = postList;
  return (
      <Col style={{marginTop:60}}>
        
          <Card style={{ width: '30rem', height:500, padding: 20, margin:'15px 0px' }}>
          <Card.Body>
            <Card.Img variant="top" src={pimage} width='200' height='200' />
            <Card.Title>{ptitle}</Card.Title>
            <Card.Text>{pcontent}</Card.Text>
          </Card.Body>
          <div><Button style={{marginRight:80}} variant="primary">👍{/*  {s[0].likes} */}</Button></div>
         <Button style={{marginLeft:270}} variant='danger'><Link to={`/pboard/read/${pcode}`}>자세히 보기</Link></Button>
        </Card>
      
      </Col>

  )
}

export default PboardItem