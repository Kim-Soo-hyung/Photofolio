import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { Badge, Button, Form, Modal } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import { app } from '../fireStore';

const MyChatItem = ({ message, onClickDelete }) => {
    const { loginUser } = useContext(UserContext);
    const { id, text, date, uid, uprofile,unickname } = message;



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