import React from 'react'
import { Button, Card, Container } from 'react-bootstrap'

const PboardItem = ( {postList} ) => {
const {pcode,ptitle,pcontent,pwriter,pimage,viewcnt,regDate,updateDate}=postList;
  return (
    <Container>
        <Card className="c" style={{ width:700,height:700 }}>
          <Card.Body>
            <Card.Img variant="top" src={pimage} />
            <Card.Title>{ptitle}</Card.Title>
            <Card.Text>{pcontent}</Card.Text>
            <Button variant="primary">👍{/*  {s[0].likes} */}</Button>
            <Button className="ml-2" variant="primary">
              👎{/*  {s[0].dislikes} */}
            </Button>
          </Card.Body>
        </Card>
        {ptitle}
      </Container>
  )
}

export default PboardItem