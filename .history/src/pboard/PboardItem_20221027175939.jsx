import React from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'

const PboardItem = ({ postList }) => {
  const { pcode, ptitle, pcontent, pwriter, pimage, viewcnt, regDate, updateDate } = postList;
  return (
      <Col>
        <Link to="/">
          <Card style={{ width: '30rem', padding: 20 }}>
          <Card.Body>
            <Card.Img variant="top" src={pimage} width='200' height='200' />
            <Card.Title>{ptitle}</Card.Title>
            <Card.Text>{pcontent}</Card.Text>
            <Button variant="primary">👍{/*  {s[0].likes} */}</Button>
            <Button className="ml-2" variant="primary">
              👎{/*  {s[0].dislikes} */}
            </Button>
          </Card.Body>
        </Card>
        </Link>
      </Col>

  )
}

export default PboardItem