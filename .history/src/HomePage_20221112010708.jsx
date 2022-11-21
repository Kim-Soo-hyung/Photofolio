import { CircularProgress } from '@material-ui/core'

import SlickBest from './SlickBest'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import BestItem from './BestItem';
import "./Carousel.css";


const HomePage = () => {
  const [bestList, setBestList] = useState([]);

  //최다 좋아요 상품 9개 call 예정
  const callAPI = async () => {
    const result = await axios.get(`/api/pboard/best`);
    setBestList(result.data);
  }


  useEffect(() => {
    callAPI();
  }, [])

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: false,
    autoPlaySpeed: 500,
    centerPadding: '90px',
    nextArrow: <img src='../image/nextbutton_80863.png' alt='빈 이미지' width={50} height={50} />,
    prevArrow: <img src='../image/backarrow1_80790.png' alt='빈 이미지' width={50} height={50} />
  };


  if (!bestList) return <h1>로딩중</h1>
  return (
    <div>
      
      <div className='img'>
          <img
            sizes='100vw'
            className="d-block w-100"
            src="/image/image17.png"
             />
             </div>
            
             <div className='img5'>
          <img
            size='10px'
            className="d-block w-100"
            
            src="/image/image16.jpg"
             />
             </div>
             <div className='img8'>
          <img
            size='10px'
            className="d-block w-100"
            
            src="/image/image19.jpg"
             />
             </div>
            
             <h3 class="animate__animated animate__bounce">인기상품</h3>
             
              
             <Slider {...settings}>
      {bestList.map(bestList =>
        <BestItem key={bestList.pcode} bestList={bestList} />
      )}
    </Slider>
    </div>
   
       
            
             
        
           
  
      


 

      
    
  )
}

export default HomePage
    

    
