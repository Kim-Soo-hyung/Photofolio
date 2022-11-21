import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import "../Pagination.css";
import { Button } from 'react-bootstrap';
import EreplyList from './EreplyList';

const EventRead = ({ history, match }) => {

  const ecode = match.params.ecode;
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [eventRead, setEventRead] = useState({
    etitle: '',
    econtent: '',
    ewriter: '',
    regDate: '',
  });
  useEffect(() => {
    callEventRead();
  }, [])

  const callEventRead = async () => {
    setLoading(true);
    const result = await axios.get(`/api/event/read/${ecode}`)
    setEventRead(result.data);
    setLoading(false);
  }

  const { etitle, econtent, ewriter, regDate } = eventRead;
  if (loading) return (
    <Spinner animation="border" variant="primary"
      style={{ width: '20rem', height: '20rem', marginTop: '220px' }} />
  )




  return (
    <div className='event_notice'>
      <h2 className='title'>이벤트</h2>
      <div className='event_article'>
        <article className='article event_article' style={{ height: '272px' }}>
          <header className='event_title'>
            <h2 classNameName='article_title'>
                {etitle}
            </h2>
            <span className='article_date' aria-label='등록일'>
              {regDate}
            </span>
          </header>
          <hr />
          <section className='article_data'>
            <div className='fr_view'>
              {econtent}
            </div>
          </section>
        </article>
      </div>

      {/* 댓글정보는 bno가 필요하기 때문에 bno를 가져가야 함. */}
      <EreplyList ecode={ecode} />
      <Button onClick={() => { history.go(-1) }}>목록</Button>
    </div>
  )
}

export default EventRead



