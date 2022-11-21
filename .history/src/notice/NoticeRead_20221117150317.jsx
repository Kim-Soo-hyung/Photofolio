import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import NreplyList from './NreplyList';
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
    <div class='event_notice'>
      <h2 class='title'>공지사항</h2>
      <div class='event_article'>
        <article class='article event_article' style={{ height: '272px' }}>
          <header class='event_title'>
            <h2>
              <span class='article_title'>
                {ntitle}
              </span>
            </h2>
            <span class='article_date' aria-label='등록일'>
              {regDate}
            </span>
          </header>
          <hr />
          <section class='article_data'>
            <div class='fr_view'>
              {ncontent}
            </div>
          </section>
        </article>
      </div>
      <Button onClick={() => { history.go(-1) }}>목록</Button>
    </div>
  )
}

export default NoticeRead

