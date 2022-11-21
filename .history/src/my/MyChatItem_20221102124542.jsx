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
          {/*       1:1 채팅일 때는 loginUser.uprofile이어도 상관없지만, 여러명의 채팅일 때는 거기에
                채팅을 쓴 모든 사람의 profile이 loginuser의 uprofile로 바뀌어서 확장에 불리하다 */}
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