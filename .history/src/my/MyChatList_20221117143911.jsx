import { addDoc, collection, deleteDoc, doc, getFirestore, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import moment from 'moment/moment';
import React, { useContext, useEffect, useState } from 'react';
import { Form, Row } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import { app } from '../fireStore';
import './chat.css';
import MyChatItem from './MyChatItem';

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
                setMsg(e.target.value);
                return false; //  prevent focus
            }

            //rooms라는 collectino아래에 loginUser.uid라는 doc을 만듦.
            //매번 로그인해서 채팅칠 때마다 다른 doc이 생김.
            //그 아래 subcollection으로 room이름이 자기 loginUser.uid인 방이 생기고
            //그 아래 subdoc으로 메시지가 들어감.
            const docRef = doc(db, "rooms", loginUser.uid);
            const colRef = collection(docRef, `room${loginUser.uid}`)
            await addDoc(colRef, {
                uid:loginUser.uid,
                sender: loginUser.unickname,
                receiver:pwriter,
                text: msg,
                date: moment(new Date()).format('LTS'),
                uprofile: loginUser.uprofile,
            });
            setMsg('');
        }
    }

    //만든 Doc element를 fetch. 새로 배열 하나 만들어서 뿌려야함.
    const getMessages = () => {
        const q = query(
          collection(db,`rooms/${loginUser.uid}/room${loginUser.uid}`),
            orderBy('date', 'asc'),
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

    /*     //나중에 roomID 부여하게 되면 roomID로 초기화하면 될듯.
        const onClickDeleteAll = async (roomId) => {
            if (!window.confirm(`삭제하실래요?`)) return;
            await deleteDoc(doc(db, 'messages',roomId));
        } */

    useEffect(() => {
        getMessages();
    }, []);

    if (!messages) return <h1>Loading......</h1>

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
            </Row>
        </div>

    )
}

export default MyChatList