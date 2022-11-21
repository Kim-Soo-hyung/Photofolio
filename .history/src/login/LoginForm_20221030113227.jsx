import React from 'react'

const LoginForm = () => {
    const [show, setShow] = useState(false);
    const uid=match.params.uid;
    
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const {setLoginUser}= useContext(UserContext);
    const [form,setForm] = useState({
        uid:'',
        upass:'',
        ucondition:''
    })
    const onClickChange= async()=>{
        if(pass==='' || pass1==='' || pass!==pass1) {
          alert('비밀번호와 비밀번호 확인을 입력하세요!');
          return;
        }
        await axios.post('/api/user/update/password',
        {uid:uid, upass:pass});
      alert("비빌번호변경완료!");
      handleClose();
      sessionStorage.removeItem('uid');
      history.push('/login');  
    }
    
  const [pass, setPass] = useState('')
  const [pass1, setPass1] = useState('')

    
    const onChange=(e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }
    
    const onSubmit = async(e) => {
        e.preventDefault();
        if(form.uid==='' || form.upass==='') {
                alert('아이디 비번을 입력하세요.')
                return;
            }

            
            const result=await axios.post('/api/user/login',form);

            
            if(result.data===0){
            alert ('아이디가 없습니다')
             }else if(result.data===2){
            alert('password가 틀렸습니다.');
            

            }else{
                sessionStorage.setItem("uid",form.uid);
             
                setLoginUser(result.data);
                
                history.push('/');
            }
        } 
       
  return (
    <div>LoginForm</div>
  )
}

export default LoginForm