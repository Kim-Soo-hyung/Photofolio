import { Height, Style } from '@material-ui/icons';
import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import { Col, Row } from 'react-bootstrap';



const AboutPage = () => {
  return (
    <div>
      <div className='sql'>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/image/k.jpg" height={570}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/image/sj.jpg" height={570} />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/image/ub.jpg" height={570} />
          </Carousel.Item>
        </Carousel>
      </div>
      <div className='vision__statement'>
        <div className='vision__statement__wrapper common__wrapper'>
          <p>
            지갑이 두둑하지는 않지만 새로운 경험을 해보고 싶었지 않으셨나요?
            새로운 경험을 만끽시켜줄 물론마켓이 여러분을 찾아갑니다!
          </p>
          <p>
            채팅부터 결제까지 원스톱으로 이뤄지는 중고거래!
            가성비 좋은 아이템들을 놓치지 마세요!
          </p>
        </div>

      </div>

      <div className='fk'>
        <img src='/image/kth.png' />
      </div>

      <div className='ub'>
        <img src='/image/jungo_auto_x2.jpg' width={1407} height={1060} />
      </div>
      <div className='item'  >
            <img src="/image/k1.png" />
            <img src="/image/k2.png" />
         <p>전국에 있는 내 취향의 브랜드 상품, 물론마켓에서 더 쉽고 안전하게 거래하세요.</p> 
          </div>


      <div class="my-4" style={{ marginBottom: 140, marginTop: 230 }}>
        <Row>
          <Col style={{ height: '230' }}>
            <Card style={{ width: '200px', height: "200px", marginLeft: 230,height:223 }}>
              <Card.Img variant="left" src="/image/a4.png" />
              <Card.Body>
                <Card.Title style={{fontFamily:'font', marginTop:25}}>허재원 - 팀장</Card.Title>
                <Card.Text>
                  총책임자로서 <br />진두지휘
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card style={{ width: '200px', height: "200px", marginLeft: 176 }}>
              <Card.Img variant="left" src="/image/a6.png" />
              <Card.Body>
                <Card.Title>김형진 - 팀원</Card.Title>
                <Card.Text>
                  전반적인 관리자 <br />페이지에 집중
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card style={{ width: '200px', height: "200px", marginLeft: 100 }}>
              <Card.Img variant="left" src="/image/a5.png" />
              <Card.Body>
                <Card.Title>김태형 - 팀원</Card.Title>
                <Card.Text>
                  홈페이지 및 전반 <br />UI에 집중
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row style={{ marginBottom: 200 }}>
          <Col>
            <Card style={{ width: '200px', height: "200px", marginTop: 220, marginLeft: 220 }}>
              <Card.Img variant="left" src="/image/a5.png" />
              <Card.Body>
                <Card.Title>김수형 - 팀원</Card.Title>
                <Card.Text>
                  마이메뉴 및 회사소개 페이지에 집중
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card style={{ width: '200px', height: "200px", marginTop: 220, marginLeft: 176 }}>
              <Card.Img variant="left" src="/image/a5.png" />
              <Card.Body>
                <Card.Title>이원준 - 팀원</Card.Title>
                <Card.Text>
                  페이징 기능과 검색<br /> 기능에 집중
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card style={{ width: '200px', height: "200px", marginTop: 220, marginLeft: 110 }}>
              <Card.Img variant="left" src="/image/a5.png" />
              <Card.Body>
                <Card.Title>노종혁 - 팀원</Card.Title>
                <Card.Text>
                  마이 메뉴 및 이벤트 페이지에 집중
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>

  )
}

export default AboutPage



