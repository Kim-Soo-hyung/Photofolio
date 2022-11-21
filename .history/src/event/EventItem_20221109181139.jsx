import React from 'react'
import { Button, ButtonGroup, Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const EventItem = ({ eventlist }) => {
  const { ecode, etitle, econtent, ewriter, regDate} = eventlist;

  return (
    <div>
        <table>
            <thead>
                <tr>
                    <th style={{width:'550px'}}>제목</th>
                    <th style={{width:'200px'}}>작성자</th>
                    <th style={{width:'200px'}}>작성날짜</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <a href={`/event/read/${ecode}`}><td>{etitle}</td></a>
                    <td>{ewriter}</td>
                    <td>{regDate}</td>
                </tr>
            </tbody>
        </table>
     </div>
  )
}

export default EventItem;