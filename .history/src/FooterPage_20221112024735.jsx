import React from 'react';
import { Button, Nav } from 'react-bootstrap';

const FooterPage = ({history}) => {

  const onClick = (e) => {
    e.preventDefault();
    const href = e.target.getAttribute("href")
    history.push(href);
  }

  return (
    <div>
      <hr />
      <footer role="contentinfo" className='c-jApbnk c-hLzBpK' >
        <div className='c-bxZDGf'>
          <nav className='c-iCiDpy'>
            <ul className='c-fYLPMS' style={{ display: 'flex' }}>
              <li className='c-jTOXZz'>
                <Button style={{ marginLeft: 330 }} variant='secondary'>
                  <Nav.Link onClick={onClick} href='https://daangn.notion.site/2b7689002cd847d78155695b5b194838https://'>
                  개인정보 처리 방침
                  </Nav.Link>
                </Button>

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
            <strong>CopyRight 2022. 물론마켓 All rights reserved</strong>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default FooterPage