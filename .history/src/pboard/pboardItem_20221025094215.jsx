import React from 'react'
import { Container } from 'react-bootstrap'

const PboardItem = (/* postList */) => {
/* const {pcode,ptitle,pconent,pwriter,pimage,viewcnt,regDate,updateDate}=postList */
  return (
    <div className="container">
      <div className="big">
        <Card className="c" style={{ width: "30rem" }}>
          <Card.Body>
            <Card.Img variant="top" src={s[0].url} />
            <Card.Title></Card.Title>
            <Card.Text>{s[0].category}</Card.Text>
            <Button variant="primary">👍 {s[0].likes}</Button>{" "}
            <Button className="ml-2" variant="primary">
              👎 {s[0].dislikes}
            </Button>
          </Card.Body>
        </Card>
      </div>
      <div className="df">
        {sp.map((movie, index) => {
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
        })}
      </div>
    </div>
  )
}

export default PboardItem