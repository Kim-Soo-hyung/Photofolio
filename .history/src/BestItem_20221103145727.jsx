import { Paper, Slider } from '@material-ui/core';
import { Button } from 'bootstrap';
import React from 'react'
import { ButtonGroup, Card, Carousel, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BestItem = ({ bestList }) => {
  const { pcode, plike, ptitle, pcontent, pwriter, pimage, viewcnt, regDate, updateDate } = bestList;




  return (

    <>
        <img src={pimage} alt={ptitle} width={150} height={150}/>
        <p>{ptitle}</p>
        </>

  )
}

export default BestItem