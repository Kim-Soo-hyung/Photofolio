import React from 'react'

const MyChatItem = () => {
    const db = getFirestore(app);
    const { user } = useContext(UserContext);
    const { id, text, date, uid } = message;
    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState({ date: date, text: text, uid: uid });
    const handleClose = () => setShow(false); const handleShow = async () => {
        const docRef = doc(db, 'messages', id); 
        const docsnap = await getDoc(docRef);
         setMsg({
            ...msg, text: docsnap.data().text
        })
        setShow(true);
    }
    const onClickSave = async () => {
        const docRef = doc(db, 'messages', id);
        if (!window.confirm(`내용을 '${msg.text}'로 수정하실래요?`)) return;
        await updateDoc(docRef, msg); setMsg(text); handleClose();
    }
    const onChange = (e) => {
        setMsg({
            ...msg, text: e.target.value
        });
    }

    return (
        <div>MyChatItem</div>
    )
}

export default MyChatItem