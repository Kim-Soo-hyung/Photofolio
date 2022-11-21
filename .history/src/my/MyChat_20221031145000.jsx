import React from 'react'

const MyChat = () => {
    const uid = sessionStorage.getItem('uid');
    const db = getFirestore(app);
    const [msg, setMsg] = useState('');
    const [messages, setMessages] = useState(null);
    const sendMessage = async (e) => {
        e.preventDefault();
        if (!window.confirm('새로운 알림을 보내실래요?')) return;
        await addDoc(collection(db, 'messages'), {
            uid: uid, text: msg, date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        });
        setMsg('');
    }
    const getMessages = () => {
        const q = query(collection(db, 'messages'), orderBy('date', 'desc'), limit(100));
        onSnapshot(q, (snapshot) => {
            let rows = []; snapshot.forEach((doc) => {
                rows.push({
                    id: doc.id, uid: doc.data().uid,
                    text: doc.data().text,
                    date: doc.data().date
                });
            });
            setMessages(rows);
        });
    }

    const onClickDelete = async (id) => {
        if (!window.confirm(`${id}번 알림을 삭제하실래요?`)) return;
        await deleteDoc(doc(db, 'messages', id));
    }

    useEffect(() => {
        getMessages();
    }, []);

    if(!messages) return <h1>Loading......</h1>

    return (
      <div>
 <Row className="justify-content-center">
 <Form onSubmit={ sendMessage } className="d-flex my-3" style={{ width:'52rem' }}>
 <Form.Control value={ msg } onChange={ (e)=> setMsg(e.target.value) }
 placeholder='보내실 내용을 적으세요...' className="mx-2"/>
 <Button type="submit">send</Button>
 </Form>
 </Row>
 <Row className="justify-content-center">
 <Card className="my-3" style={{width:'50rem'}}>
 <Table>
 <thead><tr><td>내용</td><td>날짜</td><td>보낸이</td><td>삭제</td><td>수정</td></tr></thead>
 <tbody>
 { messages.map(message=>
 <NoticeItem key={ message.id } message={ message } onClickDelete={ onClickDelete }/>
 )}
 </tbody>
 </Table>
 </Card>
 </Row>
 </div>

    )
}

export default MyChat