import React, { useContext, useEffect, useState } from 'react'
import { Button, ButtonGroup, Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PboardItem = ({ postList }) => {
  const { pcode, plike, ptitle, pcontent, pwriter, pimage, viewcnt, regDate, updateDate } = postList;
const {isLike,setIsLike}=useContext(UserContext);
  const onClickLike = (uid, pcode) => {
    setIsLike(!islike);
    //axios로 보내서 db를 갱신해야할듯.uid별로 like 상태를 다르게 구현하는 방법이 뭘까?

  }

  useEffect(()=>{

  },[islike])


  return (
    <Col style={{ marginTop: 60 }}>
      <Card style={{ width: '30rem', height: 700, padding: 20, margin: '15px 0px' }}>
        <Card.Body>
          <Card.Img src={pimage} height='300' />
          <Card.Title>{ptitle}</Card.Title>
          <Card.Text>{pcontent}</Card.Text>
        </Card.Body>
        <ButtonGroup>
          {sessionStorage.getItem('uid') &&
            <Button onClick={onClickLike} variant="primary">
              <img src={islike ? "../image/heart.png" : "../image/emptyheart.png"} width={30} />
              {plike}
            </Button>
          }
          <Link to={`/pboard/read/${pcode}`}><Button style={{ marginLeft: 270 }} variant='secondary'>자세히보기</Button></Link>
        </ButtonGroup>
      </Card>

    </Col>

  )
}

export default PboardItem