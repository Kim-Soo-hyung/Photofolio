import axios from 'axios';
import React, { useEffect, useState } from 'react'
import qs from 'qs'
import Pagination from 'react-js-pagination';
import PboardItem from './PboardItem';
import './Pagination.css'
import { Button, ButtonGroup, Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const PboardList = ({ location, history }) => {
    const search = qs.parse(location.search, { ignoreQueryPrefix: true });
    const [postList, setPostList] = useState([]);
    const [total, setTotal] = useState(1);
    const page = parseInt(search.page) || 1;
    const num = 6;


    const callPostList = async () => {
        const result = await axios.get(`/api/pboard/list?page=${page}&num=${num}`);
        setPostList(result.data.list);
        setTotal(result.data.total);
    }



    useEffect(() => {
        callPostList();
    }, [page])

    if (!postList) <h1>데이터를 로딩중입니다.</h1>

    return (
        <>
            <Row>
                {postList.map(postList =>
                        <Col style={{ marginTop: 60 }}>

                        <Card style={{ width: '30rem', height: 700, padding: 20, margin: '15px 0px' }}>
                          <Card.Body>
                            <Card.Img  src={postList.pimage} height='300' />
                            <Card.Title>{postList.ptitle}</Card.Title>
                            <Card.Text>{postList.pcontent}</Card.Text>
                          </Card.Body>
                          <ButtonGroup>
                        {/*     <Button onClick={onClickLike}  variant="primary">👍{plike}</Button> */}
                            <Link to={`/pboard/read/${postList.pcode}`}><Button style={{ marginLeft: 270 }} variant='secondary'>자세히 보기</Button></Link>
                          </ButtonGroup>
                        </Card>
                  
                      </Col>
                )}

            </Row>
            <br/>
            <br/>
          
            <Pagination
                activePage={page}
                itemsCountPerPage={6}
                totalItemsCount={total}
                pageRangeDisplayed={10}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={(e) => history.push(`/pboard/list?page=${e}`)}
            />
        </>
    )
}

export default PboardList