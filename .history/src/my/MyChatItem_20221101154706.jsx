import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { Badge, Button, Form, Modal } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import { app } from '../fireStore';

const MyChatItem = ({ message, onClickDelete }) => {
    const db = getFirestore(app);
    const { loginUser } = useContext(UserContext);
    const { id, text, date, uid, uprofile,unickname } = message;
    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState({
        date: date,
        text: text,
        unickname:unickname
    });

    const handleClose = () => setShow(false);

    /*     updateDoc을 할 때 update할 message를 read해옴.
        const handleShow = async () => {
            const docRef = doc(db, 'messages', id);
            const docsnap = await getDoc(docRef);
            setMsg({
                ...msg,
                text: docsnap.data().text
            })
            setShow(true);
        } */

    /*     //수정하기
        const onClickSave = async () => {
            const docRef = doc(db, 'messages', id);
            if (!window.confirm(`내용을 '${msg.text}'로 수정하실래요?`)) return;
            await updateDoc(docRef, msg);
            setMsg(text);
            handleClose();
        } */

    /*   //텍스트 변경
      const onChange = (e) => {
          setMsg({
              ...msg,
              text: e.target.value
          });
      } */

    return (
        <>
            <div>
                <p style={{ fontSize: 20 }}>{unickname}</p>
                {loginUser.uid !== uid && <img className='icon' src={uprofile} />}
                <p >{date}</p>
               
            </div>
            <div className="textbox">
                <p style={{ textAlign: 'left' }}>
                    {date > loginUser.notice_read_date && <Badge>new</Badge>}&nbsp;{text}
                </p>
                {uid===loginUser.uid && <Button className='mt-3' onClick={() => onClickDelete(id)}>삭제</Button>}
            </div>
        
        </>


    )
}

export default MyChatItem