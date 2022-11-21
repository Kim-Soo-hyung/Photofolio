import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

const NoticeRead = ({ match, history }) => {
  const ncode = match.params.ncode;
  const [loading, setLoading] = useState(false);
  const [noticeRead, setNoticeRead] = useState({
    ntitle: '',
    ncontent: '',
    nwriter: '',
    regDate: '',
    ncode: ''
  });

  useEffect(() => {
    callNoticeRead();
  }, [])


  const callNoticeRead = async () => {
    setLoading(true);
    const result = await axios.get(`/api/notice/read/${ncode}`)
    setNoticeRead(result.data);
    setLoading(false);
  }

  const { ntitle, ncontent, nwriter, regDate } = noticeRead;

  if (loading) return (
    <Spinner animation="border" variant="primary"
      style={{ width: '20rem', height: '20rem', marginTop: '220px' }} />
  )

  return (
    <div className='event_notice'>
      <h2 className='title'>공지사항</h2>
      <div>
        <article className='article event_article' style={{ height: '272px' }}>
         
            <h2 style={{marginTop:10}}>
              <div className="article_title">
                제목ㅡ{ntitle}
              </div>
            </h2>
            <div>
          {/*     <span style={{float:'left'}} aria-label='등록일'>
                작성자: {nwriter}
              </span>
              <span className='article_date' style={{float:'right'}} aria-label='등록일'>
                {regDate}
              </span> */}
            </div>
        
          <hr />
          <section className='article_data'>
            <div className='fr_view'>
              내용ㅡ{ncontent}
            </div>
          </section>
        </article>
      </div>
      <Button onClick={() => { history.go(-1) }}>목록으로</Button>
    </div>
  )
}

export default NoticeRead

