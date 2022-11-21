import { Height, Style } from '@material-ui/icons';
import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import {Col, Row} from 'react-bootstrap';



const AboutPage = () => {
  const [image, setImage] = useState([])
  {/*위에 내용: 상수 선언후 배열안에 객체 image 라는 결과 값을 usestate 선언후 a1.png 이미지 파일을 불러온다  */}
  {/*아래 내용:웹 사이트에서 이미지를 나열할 때가 있습니다. 
   왼쪽 오른쪽의 스크롤을 이용해서 나열하게 되면 꽤 조작하기가 힘듭니다.그래서 슬라이딩 형식으로 왼쪽에서 오른쪽으로 나열하는 컨트롤이 있는데 
  그것이 carousel, 이미지 슬라이딩 컨트롤입니다.
*/}
  return (
    <div>
      {/* <Carousel>
        <Carousel.Item>
          <img
          style={{marginTop:850}}
            sizes='100vw'
            className="d-block w-100"
            src="/image/aa1.jpg" width={930} height={230}
            alt="First slide" />
         </Carousel.Item>
        <Carousel.Item>
          <img
           style={{marginTop:320}}
           
            className="d-block w-100"
            src=""
            alt="Second slide" />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item><Carousel.Item> 
          <img
          style={{marginTop:320}}
            className="d-block w-100"
            src=""
            alt="Third slide" />
        </Carousel.Item>
 </Carousel>  */}


{/*내용: div 클래스이름을 지정후 이미지와 
    css 적용해 크기 조절후 p태그 안에 flex 속정을 줘서 컨테이너 하고 아이템을  효과 적용했습니다.*/}
      {/* <div className='vision__statement__wrapper' style={{marginTop:'120px'}}><p>모두가 나답게 일하고 즐겁게 성장하는 것을 돕는다’는
        미션 아래 채용, 커리어 콘텐츠, HR 솔루션, 프리랜서 매칭 등 다양한 서비스를 제공합니다.</p>
        <p>
          차별화된 기술과 데이터를 통해 개인화된 커리어 성장 기회를 제공하며 HR테크 업계를 선도하고 있습니다.
        </p>
      </div>
      <div id='sun'>
        <img src="" />
      </div> */}
      {/* <div className='status__title'>
        <p>우리 회사는 오늘도 일의 미래를 만들어가고 있습니다.</p>
      </div> */}
      <div className='status__list__outer'>
        <div className='status__list__inner common__wrapper'>
{/*내용: div 클래스이름을 지정후 이미지와 
    css 적용해 크기 조절후 p태그 안에 flex 속정을 줘서 컨테이너 하고 아이템을  효과 적용했습니다.*/}
          {/* <div className='status__list__item'  style={{marginTop:140,marginBottom:730}}>
            <img src="/image/k1.png" />
            <p>아시아 전역에서 230만 유저와 1만 5천 기업을 300만 번 이상 매칭하고 있습니다.</p>
          </div> */}
           <div className='status__list__item' style={{width:'216px',marginTop:155}}>
            <img src="/image/k2.png" />
            <p>다년간 축적된 300만 건의 지원</p>
          </div>
        <div className='status__list__item' style={{marginLeft:830,marginTop:155}}>
            <img src="/image/k3.png" />
            <p >매월 1.2억건 이상의 기업·유저 행동</p>
          </div>   
        </div>
      </div>

      

      
       


        {/* <p style={{textAlign:'center',marginTop:200 , fontSize:50}}>Project team</p> */}
        <div class="my-4" style={{marginBottom:140,marginTop:230}}>
        <Row>
            <Col style={{height:'200'}}>
            <Card style={{ width: '200px', height: "200px",marginLeft:230}}>
              <Card.Img variant="left" src="/image/a4.png" />
              <Card.Body>
                <Card.Title>허재원 - Team leader</Card.Title>
                <Card.Text>
                  모두가 자기가 제일 잘하는 분야에서 권한과 책임을 가진 리더에요.
                  하나의 서비스를 만들기 위해, 형식보단 일에 집중할 수 있는 환경 속에서 빠르게
                  성장하고 있어요.
                </Card.Text>
              </Card.Body>
            </Card>
            </Col>
    
          {/*내용:부트스트랩 card를 이용하여  내용을 더 가독성 있게 보여주는 기능 사용했습니다
          card img variant 위치를 왼쪽으로 지정한후 스타일 맞게 크기를 조절 했습니다.
          */}
        
        
          <Col>
            <Card style={{ width: '200px', height: "200px",marginLeft:176}}>
              <Card.Img variant="left" src="/image/a6.png" />
              <Card.Body>
                <Card.Title>김형진 - login..</Card.Title>
                <Card.Text>
                  뛰어난 동료들과 최대한의 역량을 발휘하며 일하고 있어요.
                  이 과정에서 프로덕트의 성장뿐만 아니라 개인의 성장까지 이뤄내고 있어요.
                </Card.Text>
              </Card.Body>
            </Card>
            </Col>
        

          {/*내용:부트스트랩 card를 이용하여  내용을 더 가독성 있게 보여주는 기능 사용했습니다
          card img variant 위치를 왼쪽으로 지정한후 스타일 맞게 크기를 조절 했습니다.
          */}
        
          <Col>
            <Card style={{ width: '200px', height: "200px",marginLeft:100}}>
              <Card.Img variant="left" src="/image/a5.png" />
              <Card.Body>
                <Card.Title>김태형 - login..</Card.Title>
                <Card.Text>
                  “당분간 오프라인에서 즐기는 여가와 관련된 취향 거래가 지속될 것 예상 합니다.”
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
       
        <Row style={{marginBottom:200}}>
            <Col>
              <Card style={{width: '200px', height: "200px",marginTop:220,marginLeft:220}}>
                <Card.Img variant="left" src="/image/a5.png" />
                <Card.Body>
                  <Card.Title>김수형 - update..</Card.Title>
                  <Card.Text>
                    “당분간 오프라인에서 즐기는 여가와 관련된 취향 거래가 지속될 것 예상 합니다.”
                  </Card.Text>
                </Card.Body>
              </Card>
          </Col>

          <Col>
              <Card style={{ width: '200px', height: "200px",marginTop:220,marginLeft:176}}>
                <Card.Img variant="left" src="/image/a5.png" />
                <Card.Body>
                  <Card.Title>이원준 - shop..</Card.Title>
                  <Card.Text>
                    “당분간 오프라인에서 즐기는 여가와 관련된 취향 거래가 지속될 것 예상 합니다.”
                  </Card.Text>
                </Card.Body>
              </Card>
          </Col>
        
          <Col>
              <Card style={{width: '200px', height: "200px",marginTop:220,marginLeft:110}}>
                <Card.Img variant="left" src="/image/a5.png" />
                <Card.Body>
                  <Card.Title>노종혁 - update..</Card.Title>
                  <Card.Text>
                    “당분간 오프라인에서 즐기는 여가와 관련된 취향 거래가 지속될 것 예상 합니다.”
                  </Card.Text>
                </Card.Body>
              </Card>
          </Col>
        </Row>

    
        </div>
        
    <hr/>


      {/*내용:당근 마켓 회사 소개 페이지를 통해 element 이용했습니다. */}
    <footer role="contentinfo" className='c-jApbnk c-hLzBpK' >
    <div className='c-bxZDGf'>
      <nav className='c-iCiDpy'>
        <ul className='c-fYLPMS'  style={{display:'flex'}}>
            <li className='c-jTOXZz'>
              <a rel='external noopener' href='https://daangn.notion.site/2b7689002cd847d78155695b5b194838https://'
                className='c-jZzKhV c-fNVxtA'>
                    개인정보처리방침
                </a>
            </li>
            <li className='c-jTOXZz' style={{marginLeft:'30px'}}>
            <a rel='external noopener' href='https://daangn.notion.site/6fdd92981e4a42d8b29c89cbbba7a8b7'
                className='c-jZzKhV c-fNVxtA' >
                    브랜드 리소스
                </a>
            </li>
            <li className='c-jTOXZz'   style={{marginLeft:'40px'}}>
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
    
