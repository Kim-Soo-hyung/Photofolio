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
          
        <div className="article_title">
            <h2 style={{ border: 'none' }}>
              제목ㅡ{etitle}
            </h2>
            <div style={{width:'100%',   borderBottom: '3px solid #000'}}>
              <span style={{ float: 'left' }} aria-label='등록일'>
                작성자: {ewriter}
              </span>
              <h5 className='article_date' style={{ float: 'right' }} aria-label='등록일'>
                {regDate}
              </h5>
            </div>
          </div>

          <section className='article_data'>
            <div className='fr_view'>
              내용ㅡ {econtent}
            </div>
          </section>
        </article>
      </div>

      {/* 댓글정보는 bno가 필요하기 때문에 bno를 가져가야 함. */}
      <EreplyList ecode={ecode} />
      <Button onClick={() => { history.go(-1) }}>목록으로</Button>
    </div>
  )
}

export default EventRead



