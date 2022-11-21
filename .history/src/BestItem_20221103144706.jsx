import { Paper, Slider } from '@material-ui/core';
import { Button } from 'bootstrap';
import React from 'react'
import { ButtonGroup, Card, Carousel, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BestItem = ({ bestList }) => {
  const { pcode, plike, ptitle, pcontent, pwriter, pimage, viewcnt, regDate, updateDate } = bestList;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToscroll: 1,
    autoPlay: true,
    autoPlaySpeed: 2000
};


  return (

    <Slider  {...settings}>
      <Paper>
        <img src={pimage} alt={ptitle} width={150} height={150}/>
        <p>{ptitle}</p>
      </Paper>
    </Slider>

  )
}

export default BestItem