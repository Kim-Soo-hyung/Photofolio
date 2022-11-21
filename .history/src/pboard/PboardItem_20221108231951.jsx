import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useCallback } from 'react';
import { Button, ButtonGroup, Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PboardItem = ({ postList, callPlike }) => {

  const { pcode, plike, ptitle, pcontent, pwriter, pimage, viewcnt } = postList;
  const { loginUser } = useContext(UserContext);
  const [toggle, setToggle] = useState(false);

  //상품의 좋아요 숫자+ 이용자 별 좋아요 여부 call
  const callLoveList = useCallback(async () => {
    const result = await axios.get(`/api/pboardlove/isloveread?unickname=${loginUser.unickname}&pcode=${pcode}`)
    //값 x ㅡ> 초기값 false
    setToggle(result.data.lovecondition || false);
  },[])

  //좋아요 on off 
  const onToggleLike = async () => {
    const formData = new FormData();
    formData.append('pcode', pcode);
    formData.append('unickname', loginUser.unickname);

    toggle === false ? 
      await axios.post(`/api/pboardlove/love`, formData)
      :
      await axios.post(`/api/pboardlove/dislove`, formData);
   
    setToggle(!toggle);

    //좋아요 수 실시간 반영 props from PboardList   
    callPlike();
  }


  useEffect(() => {
    callLoveList();
  }, [])


  return (
    <Col md="auto" style={{ marginTop: 60}}>

      <Card border='success' bg='light' style={{ width: '30rem', height: 700, padding:10}}>
        <Card.Body style={{ marginBottom: 50 }}>
          <Card.Header style={{ fontSize: 20, height:50}}>
            <span style={{float:'left'}}>작성자: {pwriter}</span>
            <span style={{float:'right'}}>조회수: {viewcnt}</span>
            </Card.Header>
          <Card.Img src={pimage} height='300' />
          <Card.Title style={{ textAlign: 'left', marginTop: 22 }}>제목: {ptitle}</Card.Title>
          <hr />
          <Card.Text style={{ textAlign: 'left', marginTop: 22 }}>내용: {pcontent}</Card.Text>
        </Card.Body>
        <ButtonGroup>
          <Button onClick={sessionStorage.getItem('uid') && onToggleLike} variant="primary">
            <img src={
              toggle ? "../image/heart.png" : "../image/emptyheart.png"} width={30} />
            {plike}
          </Button>

          <Link to={`/pboard/read/${pcode}`}><Button style={{ marginLeft: 310 }} variant='secondary'>자세히보기</Button></Link>
        </ButtonGroup>

      </Card>
    </Col>

  )
}

export default PboardItem