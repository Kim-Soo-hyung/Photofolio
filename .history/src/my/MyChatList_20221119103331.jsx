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

    

    return (
       
<div>
    list
</div>
    )
}

export default MyChatList