import { Height, Style } from '@material-ui/icons';
import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import { Col, Row } from 'react-bootstrap';



const AboutPage = () => {
  const [image, setImage] = useState([])
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
          그런 여러분들을 위해 새롭게 열린 물론마켓이 찾아갑니다
          </p>
          <p>
        채팅부터 결제까지 원스톱으로 이뤄지는 중고거래 사이트를 원하신다면
        지금 당장회원가입 하세요! 가성비 좋은 아이템들이 여러분을 기다리고 있습니다. 
          </p>
        </div>

      </div>

      <div className='fk'>
        <img src='/image/kth.png' />
      </div>

      <div className='ub'>
        <img src='/image/hh.png' />
      </div>
      <div className='sub'>
        <img src='/image/sub.png' />
      </div>


      <div class="my-4" style={{ marginBottom: 140, marginTop: 230 }}>
        <Row>
          <Col style={{ height: '200' }}>
            <Card style={{ width: '200px', height: "200px", marginLeft: 230, marginTop: 23 }}>
              <Card.Img variant="left" src="/image/a4.png" />
              <Card.Body>
                <Card.Title>허재원 - 팀장</Card.Title>
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
                  홈페이지 및 전반 <br/>UI에 집중
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

      <hr />


      {/*내용:당근 마켓 회사 소개 페이지를 통해 element 이용했습니다. */}
      <footer role="contentinfo" className='c-jApbnk c-hLzBpK' >
        <div className='c-bxZDGf'>
          <nav className='c-iCiDpy'>
            <ul className='c-fYLPMS' style={{ display: 'flex' }}>
              <li className='c-jTOXZz'>
                <a rel='external noopener' href='https://daangn.notion.site/2b7689002cd847d78155695b5b194838https://'
                  className='c-jZzKhV c-fNVxtA'>
                  개인정보처리방침
                </a>
              </li>
              <li className='c-jTOXZz' style={{ marginLeft: '30px' }}>
                <a rel='external noopener' href='https://daangn.notion.site/6fdd92981e4a42d8b29c89cbbba7a8b7'
                  className='c-jZzKhV c-fNVxtA' >
                  브랜드 리소스
                </a>
              </li>
              <li className='c-jTOXZz' style={{ marginLeft: '40px' }}>
                <a rel='external noopener' href='https://team.daangn.com/faq/'
                  className='c-jZzKhV c-fNVxtA'>
                  자주 묻는 질문
                </a>
              </li>
            </ul>
            <p>주소 : 인천광역시 미추홀구 매소홀로488번길 6-32 OO빌딩 5층</p>
          </nav>
        </div>
        <div className='c-gGLWxl'>
          <p>
            <strong>© 물론마켓</strong>
          </p>
        </div>
      </footer>
    </div>

  )
}

export default AboutPage



