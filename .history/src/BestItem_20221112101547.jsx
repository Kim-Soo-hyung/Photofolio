import { Button } from 'react-bootstrap';
import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';


const BestItem = ({ bestList,history }) => {
  const { pcode, plike, ptitle, pimage } = bestList;

  const onClick = (e) => {
    e.preventDefault();
    const href = e.target.getAttribute("href")
    history.push(href);
  }
  return (

    <div>
      <img src={pimage} alt={ptitle} width={400} height={300} border={2} />
      <p>{ptitle}({plike})</p>
      <Button  variant='secondary'>
        <Nav.Link href={`/pboard/read/${pcode}`} onClick={onClick}>자세히보기</Nav.Link>
      </Button>
    </div>

  )
}

export default withRouter(BestItem)