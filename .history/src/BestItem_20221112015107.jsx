import React from 'react';
import { Nav } from 'react-bootstrap';


const BestItem = ({ bestList }) => {
  const { pcode, plike, ptitle, pcontent, pwriter, pimage, viewcnt, regDate, updateDate } = bestList;

  const onClick = (e) => {
    e.preventDefault();
    const href = e.target.getAttribute("href")
    history.push(href);
  }
  return (

    <div>
      <div>
      <Nav.Link href={`/pboard/read/${pcode}`} onClick={onClick}>
        <img src={pimage} alt={ptitle} width={300} height={300} />
      </Nav.Link>
      </div>
      <p>{ptitle}({plike})</p>
    </div>

  )
}

export default BestItem