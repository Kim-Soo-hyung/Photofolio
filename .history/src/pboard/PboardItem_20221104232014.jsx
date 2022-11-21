import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup, Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import qs from 'qs';

const PboardItem = ({ postList, callPlike }) => {

  const { pcode, plike, ptitle, pcontent, pwriter, pimage, viewcnt } = postList;
  const { loginUser } = useContext(UserContext);
  const [toggle, setToggle] = useState(false);

  //상품의 좋아요 숫자+ 이용자 별 좋아요 여부 call
  const callLoveList = async () => {
    const result = await axios.get(`/api/pboardlove/isloveread?unickname=${loginUser.unickname}&pcode=${pcode}`)
    //값 x ㅡ> 초기값 false
    setToggle(result.data.lovecondition || false);
  }


  console.log(toggle);
  //토글된 상태는 해당 로그인유저별로 따로따로 다 보여야함.
  //즉 unickname 별로 따로 토글상태인 lovecondition을 받아와야 한다는 뜻. 
  //어차피 pcode는 map으로 반복시켜놔서 알아서 받게되어있음.

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
    <Col style={{ marginTop: 60 }}>

      <Card border='success' bg='light' style={{ width: '30rem', height: 700, padding: 20, margin: '15px 0px' }}>
        <Card.Body style={{ marginBottom: 50 }}>
          <Card.Header style={{ fontSize: 20, textAlign: 'left', marginTop: 0 }}>작성자: {pwriter}</Card.Header>
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

          <Link to={`/pboard/read/${pcode}`}><Button style={{ marginLeft: 300 }} variant='secondary'>자세히보기</Button></Link>
        </ButtonGroup>

      </Card>
    </Col>

  )
}

export default React.memo(PboardItem)