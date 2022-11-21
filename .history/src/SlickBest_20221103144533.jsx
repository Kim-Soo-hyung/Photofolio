import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { Carousel } from 'react-bootstrap';
import BestItem from './BestItem';


const SlickBest = ({ location, history }) => {

    const [bestList, setBestList] = useState([]);




    const callAPI = async () => {
        const result = await axios.get(`/api/pboard/best`);
        setBestList(result.data);

    }



    useEffect(() => {
        callAPI();
    }, [])


    if (!bestList) return <h1>로딩중</h1>

    return (





        <{/* Carousel>
            <Carousel.Item> */}
                {bestList.map(bestList =>
                    <BestItem key={bestList.pcode} bestList={bestList} />
                )}
 /*            </Carousel.Item>
        </Carousel> */


    )
}

export default SlickBest