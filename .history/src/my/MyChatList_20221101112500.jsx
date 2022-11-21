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
    const { loginUser } = useContext(UserContext);
    const db = getFirestore(app);
    const [msg, setMsg] = useState('');
    const [messages, setMessages] = useState(null);

    //Doc element를 최초 생성
    const sendMessage = async (e) => {
        if (e.keyCode === 13) {
            if (msg === '') {
                alert('보낼 내용을 입력하세요')
                return;
            }
            if (e.ctrlKey) {
                let val = e.target.value;
                let start = e.target.selectionStart;
                let end = e.target.selectionEnd;
                e.target.value = val.substring(0, start) + "\n" + val.substring(end);
                /*  이거 안해도 되는거보면 별상관없는듯? 
                      e.target.selectionStart = e.target.selectionEnd = start + 1; */
                setMsg(e.target.value);
                return false; //  prevent focus
            }
            await addDoc(collection(db, 'messages'), {
                uid: loginUser.uid,
                text: msg,
                date: moment(new Date()).format('a H:m'),
                uprofile: loginUser.uprofile,
                unickname: loginUser.unickname
            });
            setMsg('');
        }
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
                    uprofile: doc.data().uprofile,
                    unickname: doc.data().unickname
                });
            });
            setMessages(rows);
        });
    }

    const onClickDelete = async (id) => {
        if (!window.confirm(`${id}번 알림을 삭제하실래요?`)) return;
        await deleteDoc(doc(db, 'messages', id));
    }

    //나중에 roomID로 초기화하면 될듯.
    const onClickDeleteAll = async (uid) => {
        if (!window.confirm(`삭제하실래요?`)) return;
        await deleteDoc(doc(db, 'messages',uid));
    }

    useEffect(() => {
        getMessages();
    }, []);

    if (!messages) return <h1>Loading......</h1>

    return (
        <div style={{ margin: '50px 0px' }}>
            <Button onClick={()=>onClickDeleteAll(loginUser.uid)}>채팅창초기화</Button>
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
            </Row>
        </div>

    )
}

export default MyChatList