import { Paper, Slider } from '@material-ui/core';
import { Button } from 'bootstrap';
import React from 'react'
import { ButtonGroup, Card, Carousel, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const BestItem = ({ bestList }) => {
  const { pcode, plike, ptitle, pcontent, pwriter, pimage, viewcnt, regDate, updateDate } = bestList;

  return (

    <div>
     <Button style={{ marginLeft: 330 }} variant='secondary'>
            <Nav.Link  onClick={onClick} href={`/pboard/read/${pcode}`}>자세히보기</Nav.Link>
            </Button>
        <img src={pimage} alt={ptitle} width={300} height={300} />
      <p>{ptitle}({plike})</p>
    </div>

  )
}

export default BestItem