import { collection, getFirestore, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect,useState } from 'react';
import { app } from '../fireStore';

const MyChatList = () => {
    const [messages, setMessages] = useState([]);
    const db = getFirestore(app);
    
    const getMessages = () => {
        const q = query(
            collection(db, `${sessionStorage.getItem('uid')}`),
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
            {messages}
        </div>
    )
}

export default MyChatList