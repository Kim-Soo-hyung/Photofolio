import React from 'react'
import { Button, ButtonGroup, Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const PboardItem = ({ postList }) => {
  const { pcode, plike, ptitle, pcontent, pwriter, pimage, viewcnt, regDate, updateDate } = postList;

  const onClickLike=()=>{
    plike
  }


  return (
    <Col style={{ marginTop: 60 }}>

      <Card style={{ width: '30rem', height: 700, padding: 20, margin: '15px 0px' }}>
        <Card.Body>
          <Card.Img  src={pimage} height='300' />
          <Card.Title>{ptitle}</Card.Title>
          <Card.Text>{pcontent}</Card.Text>
        </Card.Body>
        <ButtonGroup>
          <Button onClick={onClickLike}  variant="primary">👍{plike}</Button>
          <Link to={`/pboard/read/${pcode}`}><Button style={{ marginLeft: 270 }} variant='secondary'>자세히 보기</Button></Link>
        </ButtonGroup>
      </Card>

    </Col>

  )
}

export default PboardItem