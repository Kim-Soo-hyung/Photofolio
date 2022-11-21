import React from 'react'
import { Button, Card, Container } from 'react-bootstrap'

const PboardItem = ( {postList} ) => {
const {pcode,ptitle,pcontent,pwriter,pimage,viewcnt,regDate,updateDate}=postList;
  return (
   
        <Card className="c" style={{ width:'30rem' }}>
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

  )
}

export default PboardItem