import React, { useEffect } from 'react';

const MyChatList = () => {
    const getMessages = () => {
        const q = query(
            collection(db, `${pwriter_id}/${sessionStorage.getItem('uid')}/${pcode}`),
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

useEffect(()=>{
    getMessages();
},[])

    return (
        <div style={{marginTop:100}}>
            list
        </div>
    )
}

export default MyChatList