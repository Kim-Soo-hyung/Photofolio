import { addDoc, collection, deleteDoc, doc, getFirestore, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Row, Table } from 'react-bootstrap';
import { app } from '../fireStore';
import MyChatItem from './MyChatItem';


const MyChatList = () => {
    const uid = sessionStorage.getItem('uid');
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
            date: moment(new Date()).format('a H:m')
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
                    date: doc.data().date
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
        <div className='wrap'>
          
            <Row className="justify-content-center">
                <Card className="my-3" style={{ width: '50rem' }}>
                    <Table>
                        <thead>
                            <tr>
                                <td>내용</td>
                                <td>날짜</td>
                                <td>보낸이</td>
                                <td>삭제</td>
                                <td>수정</td>
                            </tr>
                        </thead>
                        <tbody>
                            {messages.map(message =>
                                <MyChatItem key={message.id}
                                    message={message}
                                    onClickDelete={onClickDelete} />
                            )}
                        </tbody>
                    </Table>
                </Card>
            </Row>
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