import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./Carousel.css"; 
import BestItem from './BestItem';



const BestList = () => {

  const [bestList, setBestList] = useState([]);

  //fetch 8 most liked item 
  const callAPI = async () => {
    const result = await axios.get(`/api/pboard/best`);
    setBestList(result.data);
  }


  useEffect(() => {
    callAPI();
  }, [])


  //slider 4개 출력하면 사진이 화살표 자리 먹어버려서 화살표가 아예 출력이 안됨.
  //그리고 2개씩 반복되던거는 등록을 그만큼 안해놔서 그랬음. 5개 출력할거면 5개는 있어야됨 반드시
  //5개없으면 2개면 2x2+1로 2개가 2번출력되고 1개 출력됨.
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow:3,
    slidesToScroll:3,
/*     autoplay: true,
    autoPlaySpeed: 500, */
    nextArrow: <img src='../image/nextbutton_80863.png' alt='빈 이미지' width={50} height={50} />,
    prevArrow: <img src='../image/backarrow1_80790.png' alt='빈 이미지' width={50} height={50} />
  };


  if (!bestList) return <h1>로딩중</h1>

  return (
    <Slider {...settings}>
      {bestList.map(bestList =>
        <BestItem key={bestList.pcode} bestList={bestList} />
      )}
    </Slider>


  )
}

export default BestList