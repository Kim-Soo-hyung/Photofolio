import { Button } from 'bootstrap';
import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';


const BestItem = ({ bestList }) => {
  const { pcode, plike, ptitle, pcontent, pwriter, pimage, viewcnt, regDate, updateDate } = bestList;

  return (

    <div>
      <Button style={{ marginLeft: 330 }} variant='secondary'>
        <Nav.Link to={`/pboard/read/${pcode}`}>자세히보기</Nav.Link>
      </Button>
      <img src={pimage} alt={ptitle} width={300} height={300} />
      <p>{ptitle}({plike})</p>
    </div>

  )
}

export default withRouter(BestItem)