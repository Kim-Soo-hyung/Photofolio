import React from 'react'

const MyChat = () => {
    const uid = sessionStorage.getItem('uid'); const db = getFirestore(app); const [msg, setMsg] = useState(''); const [messages, setMessages] = useState(null); const sendMessage = async (e) => {
        e.preventDefault(); if (!window.confirm('새로운 알림을 보내실래요?')) return; await addDoc(collection(db, 'messages'), {
            uid: uid, text: msg, date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        }); setMsg('');
    }
    const getMessages = () => {
        const q = query(collection(db, 'messages'), orderBy('date', 'desc'), limit(100)); onSnapshot(q, (snapshot) => {
            let rows = []; snapshot.forEach((doc) => {
                rows.push({ id: doc.id, uid: doc.data().uid, text: doc.data().text, date: doc.data().date });
            }); setMessages(rows);
        });
    }
    const onClickDelete = async (id) => {
        if (!window.confirm(`${id}번 알림을 삭제하실래요?`)) return; await deleteDoc(doc(db, 'messages', id));
    }
    useEffect(() => {
        getMessages();
    }, []);
    return (
        <div>MyChat</div>
    )
}

export default MyChat