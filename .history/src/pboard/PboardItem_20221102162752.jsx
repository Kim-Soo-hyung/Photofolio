import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup, Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PboardItem = ({ postList }) => {
  const { pcode, plike, ptitle, pcontent, pwriter, pimage, viewcnt, } = postList;
  const {loginUser}=useContext(UserContext);
  const [loveList, setLoveList] = useState([]);
  //useContext에서 규정해버리니까 페이지 넘나들어도 false true 값은 유지하지만, 
  // 전 목록이 다 좋아요 눌려버림.

  const callLikeList=async()=>{
    const result=await axios.get('/api/pboard/loveList')
    setLoveList(result.data);
  }

  const {unickname, lovecondtion}=loveList;


  const onToggleLike = async (pwriter, pcode) => {
    const formData = new FormData();
    formData.append('pcode', pcode);
    formData.append('unickname', loginUser.unickname /* 새로고침에 취약한지 보기 */);
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
  }
  console.log(loveList) 
  lovecondtion===true ? await axios.post(`/api/pboard/dislove`, formData)
      : await axios.post(`/api/pboard/love`, formData)
  }


  useEffect(() => {
    callLikeList();
  }, [lovecondtion])

/*   if(!likeList) return(
    <h1>없습니다.</h1>
  ) */

  return (
    <Col style={{ marginTop: 60 }}>
      <Card style={{ width: '30rem', height: 700, padding: 20, margin: '15px 0px' }}>
        <Card.Body>
          <Card.Img src={pimage} height='300' />
          <Card.Title>{pwriter}</Card.Title>
          <Card.Title>{ptitle}</Card.Title>
          <Card.Text>{pcontent}</Card.Text>
        </Card.Body>
        <ButtonGroup>
          {sessionStorage.getItem('uid') &&
            <Button onClick={() => onToggleLike(unickname, pcode)} variant="primary">
              <img src={lovecondtion ? "../image/heart.png" : "../image/emptyheart.png"} width={30} />
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