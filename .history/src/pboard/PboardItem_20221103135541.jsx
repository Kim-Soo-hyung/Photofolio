import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup, Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PboardItem = ({ postList }) => {
  const { pcode, plike, ptitle, pcontent, pwriter, pimage, viewcnt } = postList;
  const { loginUser } = useContext(UserContext);
  const [loveList, setLoveList] = useState([]);
  const [toggle,setToggle]=useState(false);

  const callLikeList = async () => {
    const result = await axios.get('/api/pboardlike/lovelist')
    setLoveList(result.data);
    //callLikeList 함수안 에서 state가 바뀌므로 이 함수 밖으로 나가야 loveList가 반영되어있다.
    setToggle(result.data.lovecondition);
  }

//토글된 상태는 해당 로그인유저별로 따로따로 다 보여야함.
//즉 unickname 별로 따로 토글상태인 lovecondition을 받아와야 한다는 뜻. 
//어차피 pcode는 map으로 반복시켜놔서 알아서 받게되어있음.

  const onToggleLike = async (pwriter, pcode) => {
    const formData = new FormData();
    formData.append('pcode', pcode);
    formData.append('unickname', loginUser.unickname /* 새로고침에 취약한지 보기 */);
    if(toggle===false){
      await axios.post(`/api/pboardlike/love`, formData);
    }else{
      await axios.post(`/api/pboardlike/dislove`, formData);
    }
    setToggle(!toggle);
  }


  useEffect(() => {
    callLikeList();
  }, [])


  return (
    <Col style={{ marginTop: 60 }}>
      <Card style={{ width: '30rem', height: 700, padding: 20, margin: '15px 0px' }}>
        <Card.Body>
          <Card.Img src={pimage} height='300' />
          <Card.Title>
            <span style={{textAlign:'left'}}>작성자:</span> {pwriter}</Card.Title>
          <hr/>
          <Card.Title>제목: {ptitle}</Card.Title>
          <hr/>
          <Card.Text>내용:<hr/> {pcontent}</Card.Text>
        </Card.Body>
        <ButtonGroup>
          {sessionStorage.getItem('uid') &&
            <Button onClick={() => onToggleLike(loginUser.unickname, pcode)} variant="primary">
              <img src={
                // include나 find로 써볼 수 있을듯. 이걸 read로 하면 include도 해보자
                toggle ?  "../image/heart.png" : "../image/emptyheart.png"/* "../image/emptyheart.png" */} width={30} />
              {plike}
            </Button>
          }
          <Link to={`/pboard/read/${pcode}`}><Button style={{ marginLeft: 300 }} variant='secondary'>자세히보기</Button></Link>
        </ButtonGroup>
      </Card>

    </Col>

  )
}

export default PboardItem