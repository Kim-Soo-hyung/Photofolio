import React, { useState } from 'react';
import { Button, Row, Alert, Card } from 'react-bootstrap';
import { Grid, TextField } from '@material-ui/core';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import Swal from 'sweetalert2'

const MyUpdatePass = ({ history }) => {
    const [pass1, setPass1] = useState('')
    const { loginUser } = useContext(UserContext);
    const [isCheck,setIsCheck]=useState(false);

    //  8 ~ 10자 영문, 숫자 조합
    const checkPassword_submit = (form) => {
        var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/
        const result = regExp.test(form);
        if (!result) alert('비밀번호를 양식대로 써주세요');
        return result;
    }

    const [form, setForm] = useState({
        uid: loginUser.uid,
        upass: ''
    })

    const { uid, upass } = form;

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    //비번 일치 확인
    const onCheckPass = async (e) => {
        e.preventDefault();
        if (pass1 === '') {
            Swal.fire({
                text: "비밀번호를 입력하세요",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
              })
            return;
        }


        else if (checkPassword_submit(form.upass) === false) {
            Swal.fire({
                title: '글을 삭제하시겠습니까?',
                text: "삭제하시면 다시 복구시킬 수 없습니다.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '삭제',
                cancelButtonText: '취소'
              })
            return;
        }

        else if (upass !== pass1) {
            alert('새로운 비밀번호와 입력한 비밀번호가 다릅니다!');
            return;
        }
        else if (upass === pass1) {
            alert('비밀번호가 일치합니다.');
            setIsCheck(true);
            return; 
        }
        

    }

    const onSubmitUpdate = async (e) => {
        e.preventDefault();

        if (!window.confirm('입력하신 비밀번호로 변경하시겠습니까?')) {
            setIsCheck(false);
            return;
        }

        const formData = new FormData();
        formData.append("uid", uid);
        formData.append("upass", upass);
        try {
            await axios.post('/api/user/updatepw/', formData);
            alert('비밀번호 변경완료!');
            history.push('/login/form')
        } catch (e) {
            if (e) alert('예상치 못한 오류가 발생했습니다.')
        }
    }

    return (
        <div className='d-flex justify-content-center mt-5'>
            <Row className='mt-3'>
                <Card style={{ width: '30rem' }} className="p-3">
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="비밀번호"
                            helperText="8-10자 영문대소문자와 숫자를 조합"
                            FormHelperTextProps={{ style: { fontSize: 15 } }}
                            value={form.upass}
                            name="upass"
                            autoComplete="upass"
                            type="password"
                            onChange={onChange}
                        />
                    </Grid>

                    <hr />
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="upass"
                            label="비밀번호 확인"
                            value={pass1}
                            name="upass"
                            autoComplete="upass"
                            type="password"
                            onChange={(e) => setPass1(e.target.value)}
                        />
                    </Grid>
                    <Button onClick={onCheckPass} className='mt-3'>패스워드 일치 확인</Button>
                 
                    <Button onClick={isCheck===true ? onSubmitUpdate :()=>alert('비밀번호 일치 여부를 확인하세요')} className='mt-3'>비밀번호 변경</Button>
                </Card>
            </Row>
        </div>
    )
}

export default MyUpdatePass