import { addDoc, collection, deleteDoc, doc, getFirestore, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Row, Table } from 'react-bootstrap';
import { app } from '../fireStore';
import MyChatItem from './MyChatItem';
import './chat.css'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const MyChatList = () => {
    const uid = sessionStorage.getItem('uid');
    const {loginUser}=useContext(UserContext);
    const db = getFirestore(app);
    const [msg, setMsg] = useState('');
    const [messages, setMessages] = useState(null);

    //Doc element를 최초 생성
    const sendMessage = async (e) => {
        e.preventDefault();
        if (!window.confirm('새로운 메시지를 보내실래요?')) return;
        await addDoc(collection(db, 'messages'), {
            uid: uid,
            text: msg,
            date: moment(new Date()).format('a H:m'),
            uprofile:loginUser.uprofile
        });
        setMsg('');
    }

    //만든 Doc element를 fetch. 새로 배열 하나 만들어서 뿌려야함.
    const getMessages = () => {
        const q = query(
            collection(db, 'messages'),
            orderBy('date', 'desc'),
            limit(100)
        );

        onSnapshot(q, (snapshot) => {
            let rows = [];
            snapshot.forEach((doc) => {
                rows.push({
                    id: doc.id,
                    uid: doc.data().uid,
                    text: doc.data().text,
                    date: doc.data().date,
                    uprofile:doc.data().uprofile
                });
            });
            setMessages(rows);
        });
    }

    const onClickDelete = async (id) => {
        if (!window.confirm(`${id}번 알림을 삭제하실래요?`)) return;
        await deleteDoc(doc(db, 'messages', id));
    }

    useEffect(() => {
        getMessages();
    }, []);

    if (!messages) return <h1>Loading......</h1>

    return (
        <div style={{ margin: '50px 0px' }}>
            <div className="wrap">
        
                    {messages.map(message =>
                        <div className={message.uid === uid ? 'chat ch2' : 'chat ch1'}>
                            <MyChatItem key={message.id}
                                message={message}
                                onClickDelete={onClickDelete} />
                        </div>
                    )}

            </div>
            <Row className="mt-5 justify-content-center">
                <Form onSubmit={sendMessage} className="d-flex my-3" style={{ width: '52rem' }}>
                    <Form.Control
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        placeholder='보내실 내용을 적으세요' className="mx-2" />
                    <Button type="submit">전송</Button>
                </Form>
            </Row>
        </div>

    )
}

export default MyChatList