import { addDoc, collection, deleteDoc, doc, getFirestore, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import moment from 'moment/moment';
import React, { useContext, useEffect, useState } from 'react';
import { Form, Row, Button, Spinner } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import { app } from '../fireStore';
import './chat.css'
import MyChatItem from './MyChatItem';
import axios from 'axios';

const MyChatRead = ({match,history}) => {
  const { loginUser } = useContext(UserContext);
  const pcode = match.params.pcode;
  const db = getFirestore(app);
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([]);
  const [pwriter_id,setPwriter_id]=useState('');

  const callPwriter_id = async () => {
        const result = await axios.get(`/api/pboard/read/${pcode}`)
        setPwriter_id(result.data.uid);
      }

  //Doc element를 최초 생성
  const sendMessage = async (e) => {
      if (e.keyCode === 13) {
          if (msg === '') {
              alert('보낼 내용을 입력하세요')
              return;
          }
          if (e.ctrlKey) {
              let val = e.target.value;
              let start = e.target.selectionStart;
              let end = e.target.selectionEnd;
              e.target.value = val.substring(0, start) + "\n" + val.substring(end);
              setMsg(e.target.value);
              return false; //  prevent focus
          }

          //rooms라는 collectino아래에 loginUser.uid라는 doc을 만듦.
          //매번 로그인해서 채팅칠 때마다 다른 doc이 생김.
          //그 아래 subcollection으로 room이름이 자기 loginUser.uid인 방이 생기고
          //그 아래 subdoc으로 메시지가 들어감.
          //pcode ㅡ> pwriter_id(판매자 uid) ㅡ> 로그인한아이디(uid) 
          const docRef = doc(db, pcode, pwriter_id);
          const colRef = collection(docRef, `${sessionStorage.getItem('uid')}`)
          await addDoc(colRef, {
              uid: sessionStorage.getItem('uid'),
              text: msg,
              date: moment(new Date()).format('LTS'),
              uprofile: loginUser.uprofile,
              unickname: loginUser.unickname
          });
          setMsg('');
      }
  }

  //만든 Doc element를 fetch. 새로 배열 하나 만들어서 뿌려야함.
  //맨 처음 render할 때 axios가 느리기 때문에 pwriter_id가 빈 값으로 들어가서 /가 하나 더 생김.
  //그래서 자꾸 path must not contain //이라는 오류가 뜸.
  //그러니까 초기 값으로 ''같은 빈 칸이 아니라 'a'를 넣어주면 문제 해결.
  const getMessages = () => {
      const q = query(
          collection(db, `${pcode}/${pwriter_id}/${sessionStorage.getItem('uid')}`),
          orderBy('date', 'asc'),
          limit(100)
      );
      console.log(q);

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

  useEffect(() => {
    callPwriter_id();
    getMessages();
}, []);



  const onClickDelete = async (id) => {
      if (!window.confirm(`메세지를 삭제하시겠습니까?`)) return;
      await deleteDoc(doc(db, `rooms/${sessionStorage.getItem('uid')}/room${sessionStorage.getItem('uid')}`, id));
  }

  if (!messages) return (
    <Spinner animation="border" variant="primary"
        style={{ width: '20rem', height: '20rem', marginTop: '220px' }} />
)

  return (
    <div style={{ margin: '50px 0px' }}>
            {/*         <Button onClick={()=>onClickDeleteAll()}>채팅창초기화</Button> */}
            <div className="wrap">

                {messages.map(message =>
                    <div className={message.uid === loginUser.uid ? 'chat ch2' : 'chat ch1'}>
                        <MyChatItem key={message.id}
                            message={message}
                            onClickDelete={onClickDelete} />
                    </div>
                )}

            </div>

            <Row className="mt-5 justify-content-center">
                <Form className="d-flex my-3" style={{ width: '52rem' }}>
                    <Form.Control
                        as="textarea"
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        onKeyDown={sendMessage}
                        placeholder='enter를 누르세요' className="mx-2" />
                </Form>
                <div>
                    <Button onClick={() => history.push(`/my/pay/${pcode}`)}>결제창 이동</Button>
                </div>
            </Row>
        </div>
  )
}

export default MyChatRead