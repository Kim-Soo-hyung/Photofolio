import React from 'react'
import { Button, Card, Container } from 'react-bootstrap'

const PboardItem = (/* postList */) => {
/* const {pcode,ptitle,pconent,pwriter,pimage,viewcnt,regDate,updateDate}=postList */
  return (
    <div className="container">
      <div className="big">
        <Card className="c" style={{ width: "30rem" }}>
          <Card.Body>
            <Card.Img variant="top" src='https://dummyimage.com/100x100' />
            <Card.Title>카드입니다.</Card.Title>
            <Card.Text>카드가 참 길단말이죠? 근데 이게 이 카드의 역사란 말이죠?</Card.Text>
            <Button variant="primary">👍{/*  {s[0].likes} */}</Button>{" "}
            <Button className="ml-2" variant="primary">
              👎{/*  {s[0].dislikes} */}
            </Button>
          </Card.Body>
        </Card>
      </div>
      <div className="df">
{/*         {sp.map((movie, index) => {
          return (
            <Card className="d" style={{ width: "15rem" }}>
              <Card.Body>
                <Card.Img
                  variant="top"
                  src={movie.url}
                  // style={{ width: "15rem", height: "15rem" }}
                />
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.category}</Card.Text>
                <Button variant="primary">👍 {movie.likes}</Button>{" "}
                <Button className="ml-2" variant="primary">
                  👎 {movie.dislikes}
                </Button>
              </Card.Body>
            </Card>
          );
        })} */}
      </div>
    </div>
  )
}

export default PboardItem