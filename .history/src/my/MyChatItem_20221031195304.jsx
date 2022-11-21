import React from 'react'
import { getFirestore, getDoc, doc } from 'firebase/firestore';
import { app } from './fireStore';
import { useEffect } from 'react';
import { useState } from 'react';
import { Mdoal, Form, Row, Table, Card,Button } from 'react-bootstrap';
import moment from 'moment/moment';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
const MyChatItem = () => {
    const db = getFirestore(app);
    const { loginUser } = useContext(UserContext);
    const { id, text, date, uid } = message;
    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState({
        date: date,
        text: text,
        uid: uid
    });

    const handleClose = () => setShow(false); const handleShow = async () => {
        const docRef = doc(db, 'messages', id);
        const docsnap = await getDoc(docRef);
        setMsg({
            ...msg, text: docsnap.data().text
        })
        setShow(true);
    }

    const onClickSave = async () => {
        const docRef = doc(db, 'messages', id);
        if (!window.confirm(`내용을 '${msg.text}'로 수정하실래요?`)) return;
        await updateDoc(docRef, msg); setMsg(text); handleClose();
    }

    const onChange = (e) => {
        setMsg({
            ...msg, text: e.target.value
        });
    }

    return (
        <>
            <tr>
                <td style={{ textAlign: 'left' }}>
                    <>
                        {date > user.notice_read_date && <Badge>new</Badge>}&nbsp;{text}
                    </>
                </td>
                <td>{date}</td>
                <td>{uid}</td>
                <td><Button onClick={() => onClickDelete(id)}>삭제</Button></td>
                <td><Button onClick={handleShow}>수정</Button></td>
            </tr>
            {/************************* 알림 수정을 위한 모달창 *****************************/} <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>알림내용을 수정합니다.</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control onChange={onChange} value={msg.text} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={onClickSave}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default MyChatItem