import { Button } from 'react-bootstrap';
import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';


const BestItem = ({ bestList }) => {
  const { pcode, plike, ptitle, pimage } = bestList;

  return (

    <div>
      <img src={pimage} alt={ptitle} width={300} height={300} />
      <p>{ptitle}({plike})</p>
      <Button  variant='secondary'>
        <Link to={`/pboard/read/${pcode}`}>자세히보기</Link>
      </Button>
    </div>

  )
}

export default withRouter(BestItem)