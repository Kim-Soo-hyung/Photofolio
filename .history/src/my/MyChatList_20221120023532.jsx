import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect } from 'react';
import './chat.css';
import { app } from '../fireStore';
const MyChatList = () => {
    const [messages, setMessages] = useState([]);
    const db = getFirestore(app);
    
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