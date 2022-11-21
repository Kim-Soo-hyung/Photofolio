import { addDoc, collection, deleteDoc, doc, getFirestore, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import moment from 'moment/moment';
import React, { useContext, useEffect, useState } from 'react';
import { Form, Row, Button, Spinner } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import { app } from '../fireStore';
import './chat.css';
import MyChatItem from './MyChatItem';
import axios from 'axios';

const MyChatList = ({ history, match }) => {
  

    /*     //나중에 roomID 부여하게 되면 roomID로 초기화하면 될듯.
        const onClickDeleteAll = async (roomId) => {
            if (!window.confirm(`삭제하실래요?`)) return;
            await deleteDoc(doc(db, 'messages',roomId));
        } */

    useEffect(() => {
        callPwriter_id();
        getMessages();
    }, []);

    if (!messages) return (
        <Spinner animation="border" variant="primary"
            style={{ width: '20rem', height: '20rem', marginTop: '220px' }} />
    )

    return (
        <div style={{ margin: '50px 0px' }}>
            {/*         <Button onClick={()=>onClickDeleteAll()}>채팅창초기화</Button> */}
            <div className="wrap">

                {messages.map(message =>
                    <div className={message.uid === loginUser.uid ? 'chat ch2' : 'chat ch1'}>
                        <MyChatItem key={message.id}
                            message={message}
                            onClickDelete={onClickDelete} />
                    </div>
                )}

            </div>

            <Row className="mt-5 justify-content-center">
                <Form className="d-flex my-3" style={{ width: '52rem' }}>
                    <Form.Control
                        as="textarea"
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        onKeyDown={sendMessage}
                        placeholder='enter를 누르세요' className="mx-2" />
                </Form>
                <div>
                    <Button onClick={() => history.push(`/my/pay/${pcode}`)}>결제창 이동</Button>
                </div>
            </Row>
        </div>

    )
}

export default MyChatList