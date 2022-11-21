import React from 'react';
import { Nav } from 'react-bootstrap';


const BestItem = ({ bestList }) => {
  const { pcode, plike, ptitle, pcontent, pwriter, pimage, viewcnt, regDate, updateDate } = bestList;

  return (

    <div>
      <div>
      <Nav.Link to={`/pboard/read/${pcode}`}>
        <img src={pimage} alt={ptitle} width={300} height={300} />
      </Nav.Link>
      </div>
      <p>{ptitle}({plike})</p>
    </div>

  )
}

export default BestItem