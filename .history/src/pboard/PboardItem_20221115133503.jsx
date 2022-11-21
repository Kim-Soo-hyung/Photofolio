import axios from 'axios';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup, Card, Col, Nav } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PboardItem = ({ postList, history, callPlike }) => {

  const { pcode, pcondition, ptitle, pcontent, pwriter, pimage, viewcnt, plike } = postList;
  const { loginUser } = useContext(UserContext);
  const [toggle, setToggle] = useState(false);

  //plike on PboardItem + boolean of user on whether click like or not 
  const callLoveList = useCallback(async () => {
    const result = await axios.get(`/api/pboardlove/isloveread?unickname=${loginUser.unickname}&pcode=${pcode}`)
    //값 x ㅡ> 초기값 false
    setToggle(result.data.lovecondition || false);
  }, [])

  const onClick = (e) => {
    e.preventDefault();
    const href = e.target.getAttribute("href")
    history.push(href);
  }

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
    callPlike();
  }


  useEffect(() => {
    callLoveList();
  }, [toggle])


  return (
    <>
      {pcondition === 0 &&
        <Col md="auto" style={{ marginTop: 60 }}>

          <Card border='success' bg='light' style={{ width: '30rem', height: 700, padding: 10 }}>
            <Card.Body style={{ marginBottom: 50 }}>
              <Card.Header style={{ fontSize: 20, height: 50 }}>
                <span style={{ float: 'left' }}>작성자: {pwriter}</span>
                <span style={{ float: 'right' }}>조회수: {viewcnt}</span>
              </Card.Header>
              <Card.Img src={pimage} height='300' />
              <Card.Title style={{ textAlign: 'left', marginTop: 22 }}>제목: {ptitle}</Card.Title>
              <hr />
              <Card.Text style={{ textAlign: 'left', marginTop: 22 }}>내용: {pcontent}</Card.Text>
            </Card.Body>
            <ButtonGroup>
              <Button className='btn-10' onClick={sessionStorage.getItem('uid') && onToggleLike} variant="primary">
                <img src={
                  toggle ? "../image/heart.png" : "../image/emptyheart.png"} width={25} />
                {plike}
              </Button>

              <Button style={{ marginLeft: 330 }} variant='secondary'>
                <Nav.Link className='box' onClick={onClick} href={`/pboard/read/${pcode}`}>자세히보기</Nav.Link>
              </Button>
            </ButtonGroup>

          </Card>
        </Col>
      }
    </>

  )
}

export default withRouter(PboardItem)