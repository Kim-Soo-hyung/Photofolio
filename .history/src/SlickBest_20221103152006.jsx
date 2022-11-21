import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Carousel } from 'react-bootstrap';
import Slider from 'react-slick';
import BestItem from './BestItem';



const SlickBest = ({ location, history }) => {

    const [bestList, setBestList] = useState([]);




    const callAPI = async () => {
        const result = await axios.get(`/api/pboard/best`);
        setBestList(result.data);
    }




    useEffect(() => {
        callAPI();
        console.log(bestList)
    }, [])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoPlaySpeed: 500
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

export default SlickBest