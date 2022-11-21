import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { Carousel, Pagination, Row } from 'react-bootstrap';
import BestItem from './BestItem';
import Slider from 'react-slick';


const SlickBest = ({ location, history }) => {

  const [bestList, setBestList] = useState([]);
  
  const callAPI = async () => {
      const result = await axios.get(`/api/pboard/best`);
      setBestList(result.data);
  }



  useEffect(() => {
      callAPI();
  }, [])
  
  
  if (!bestList)  return <h1>로딩중</h1>

  return (
    <Carousel
    next={ () => {/* Do stuff */} }
    prev={ () => {/* Do other stuff */} }
    >
        {bestList.map(bestList =>
            <BestItem key={bestList.pcode} bestList={bestList} />
        )}
      


</Carousel>


)
}

export default SlickBest