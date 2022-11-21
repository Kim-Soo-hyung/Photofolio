import { CircularProgress } from '@material-ui/core'
import React from 'react'
import SlickBest from './SlickBest'

const HomePage = () => {
  return (
    <div>
          <img
            sizes='100vw'
            className="d-block w-100"
            src="/image/optimize.jpg"
             />
             
          <img
            sizes='100vw'
            className="d-block w-100"
            src="/image/main2.png"
             />
             <h3>인기상품</h3>
      
      <SlickBest/>
    </div>
  )
}

export default HomePage
    
