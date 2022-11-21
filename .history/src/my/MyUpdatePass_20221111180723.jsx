import React, { useState } from 'react';
import { Button, Row, Alert, Card } from 'react-bootstrap';
import { Grid, TextField } from '@material-ui/core';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';

const LoginUpdatePass = ({ history }) => {
    const [pass1, setPass1] = useState('')
    const [message, setMessage] = useState('');
    const { loginUser, setLoginUser } = useContext(UserContext);

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
    const onSubmitPass = async (e) => {
        e.preventDefault();
        if (pass1 === '') {
            alert('새로운 비밀번호를 입력해주세요.')
            return;
        }

        if (upass !== pass1) {
            alert('새로운 비밀번호와 입력한 비밀번호가 다릅니다!');
            return;
        }
        if (upass === pass1) {
            alert('비밀번호가 일치합니다.')
        }

        if (checkPassword_submit(form.upass) === false) {
            return;
        }
    }

    const onSubmitUpdate = async () => {
        if (!window.confirm('입력하신 비밀번호로 변경하시겠습니까?')) {
        } if (pass1 === '') {
            alert('새로운 비밀번호를 입력해주세요.')
            return;
        }
        const formData = new FormData();
        formData.append("uid", uid);
        formData.append("upass", upass);
        try {
            await axios.post('/api/user/updatePw/', formData);
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
                            label="Password"
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
                            label="confirm Password"
                            /*   error={pass1!==upass}
                              helperText={pass1!==upass ? '비밀번호가 일치하지 않습니다.' : '비밀번호가 일치합니다'} */
                            value={pass1}
                            name="upass"
                            autoComplete="upass"
                            type="password"
                            onChange={(e) => setPass1(e.target.value)}
                        />
                    </Grid>
                    {message && <Alert>{message}</Alert>}
                    <Button onClick={onSubmitPass} className='mt-3'>패스워드 일치 확인</Button>
                    <Button onClick={onSubmitUpdate} className='mt-3'>비밀번호 변경</Button>
                </Card>
            </Row>
        </div>
    )
}

export default LoginUpdatePass