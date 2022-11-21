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
      <div className='event_article'>
        <article className='article event_article' style={{ height: '272px' }}>
          <header className='event_title'>
            <h2>
              <span className='article_title'>
                제목ㅡ{ntitle}
              </span>
            </h2>
            <span className='article_date' aria-label='등록일'>
              {regDate}
            </span>
          </header>
          <hr />
          <section className='article_data'>
            <div className='fr_view'>
              내용ㅡ{ncontent}
            </div>
          </section>
        </article>
      </div>
      <Button onClick={() => { history.go(-1) }}>목록</Button>
    </div>
  )
}

export default NoticeRead

