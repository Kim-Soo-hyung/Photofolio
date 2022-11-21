import { CircularProgress } from '@material-ui/core'
import React from 'react'
import SlickBest from './SlickBest'

const HomePage = () => {
  return (
    <div>
          <img
            sizes='100vw'
            className="d-block w-100"
            src="/image/main.png"
             />
             
          <img
            sizes='100vw'
            className="d-block w-100"
            src="/image/main2.png"
             />
      
      <SlickBest/>
    </div>
  )
}

export default HomePage