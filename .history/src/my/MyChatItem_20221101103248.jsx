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
                <Button className='mt-3' onClick={() => onClickDelete(id)}>삭제</Button>
                {/*     <Button onClick={handleShow}>수정</Button> */}
            </div>
        
        </>
        /* ************************ 알림 수정을 위한 모달창 *****************************
          <Modal show={show} onHide={handleClose}>
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
          </Modal> */

    )
}

export default MyChatItem