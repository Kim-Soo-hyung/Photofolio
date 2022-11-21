
import React from 'react';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import BestList from './BestList';
import "./Carousel.css";
import "./HomePage.css";


const HomePage = () => {

  return (
    <div className='sql'>

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


     <BestList/>
    </div>














  )
}

export default HomePage



