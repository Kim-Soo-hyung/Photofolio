import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { UserContext } from '../context/UserContext';
import qs from 'qs';
import { Button, Spinner, Table } from 'react-bootstrap';
import Pagination from 'react-js-pagination';

const MyChatRead = () => {
  const { loginUser } = useContext(UserContext);
  const pcode = match.params.pcode;
  const db = getFirestore(app);
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState(null);
  const [pwriter_id,setPwriter_id]=useState('');

  const callPwriter_id = async () => {
        const result = await axios.get(`/api/pboard/read/${pcode}`)
        setPwriter_id(result.data.uid);
        console.log(result.data);
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
          //room ㅡ> pcode ㅡ> 로그인 아이디 
          const docRef = doc(db, pcode, pcode);
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
  const getMessages = () => {
      const q = query(
          collection(db, `${pcode}/${pcode}/${sessionStorage.getItem('uid')}`),
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

  const onClickDelete = async (id) => {
      if (!window.confirm(`메세지를 삭제하시겠습니까?`)) return;
      await deleteDoc(doc(db, `rooms/${sessionStorage.getItem('uid')}/room${sessionStorage.getItem('uid')}`, id));
  }
  
  return (
    <div>MyChatRead</div>
  )
}

export default MyChatRead