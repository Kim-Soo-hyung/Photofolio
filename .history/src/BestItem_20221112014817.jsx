import { Paper, Slider } from '@material-ui/core';
import { Button } from 'bootstrap';
import React from 'react'
import { ButtonGroup, Card, Carousel, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const BestItem = ({ bestList }) => {
  const { pcode, plike, ptitle, pcontent, pwriter, pimage, viewcnt, regDate, updateDate } = bestList;

  return (

    <div>
      <Nav.Link to={`/pboard/read/${pcode}`}>
        <img src={pimage} alt={ptitle} width={300} height={300} />
      </Nav>
      <p>{ptitle}({plike})</p>
    </div>

  )
}

export default BestItem