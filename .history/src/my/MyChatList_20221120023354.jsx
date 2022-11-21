import { addDoc, collection, deleteDoc, doc, getFirestore, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import moment from 'moment/moment';
import React, { useContext, useEffect, useState } from 'react';
import { Form, Row, Button, Spinner } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import { app } from '../fireStore';
import './chat.css'
import MyChatItem from './MyChatItem';
import qs from 'qs';
const MyChatList = () => {
    const getMessages = () => {
        const q = query(
            collection(db, `${pwriter_id}`),
            orderBy('date', 'asc'),
            limit(100)
        );

        onSnapshot(q, (snapshot) => {
            let rows = [];
            snapshot.forEach((doc) => {
                rows.push({
                    uid: doc.data().uid,
                });
            });
            setMessages(rows);
        });
    }

    useEffect(() => {
        getMessages();
    }, [])

    return (
        <div style={{ marginTop: 100 }}>
            list
        </div>
    )
}

export default MyChatList