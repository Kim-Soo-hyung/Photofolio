import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { Carousel } from 'react-bootstrap';
import BestItem from './BestItem';

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesTocroll: 1,
    autoPlay: true,
    autoPlaySpeed: 2000
};

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


    if (!bestList) return <h1>로딩중</h1>

    return (
        <Slider {...settings}>
            <div>
                {bestList.map(bestList =>
                    <BestItem key={bestList.pcode} bestList={bestList} />
                )}
            </div>
        </Slider>


    )
}

export default SlickBest