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
    const [isCheck, setIsCheck] = useState(false);

    //  8 ~ 10 char combination of number + alaphabet
    const onCheckPassword = (form) => {
        var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/
        const result = regExp.test(form);
        if (!result) return result;
    }

    const onSwalAlert = () => {
        Swal.fire({
            text: "비밀번호 일치여부를 확인하여주세요",
            icon: 'warning',
            confirmButtonColor: '#3085d6',
        })
    }

    const [form, setForm] = useState({
        uid: loginUser.uid,
        upass: ''
    })

    const { uid, upass } = form;

    const onChangeForm = (e) => {
        setForm(prev=>({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    //validate password
    const onCheckPass = async (e) => {
        e.preventDefault();
        if (pass1 === '') {
            Swal.fire({
                text: "비밀번호를 입력하세요",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
            })
        }

        else if (onCheckPassword(form.upass) === false) {
            Swal.fire({
                text: "비밀번호 양식을 준수해주세요",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
            })
        }

        else if (upass !== pass1) {
            Swal.fire({
                text: "비밀번호가 서로 일치하지 않습니다!",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
            })
        }

        else if (upass === pass1) {
            Swal.fire({
                text: "비밀번호가 일치합니다!",
                icon: 'success',
                confirmButtonColor: '#3085d6',
            })
            setIsCheck(true);
        }
    }

    const onUpdate = (e) => {
        e.preventDefault();

        Swal.fire({
            text: "수정하시겠습니까?",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '수정',
            cancelButtonText: '취소'
        }).then(async (result) => {

            if (result.isConfirmed) {
                const formData = new FormData();
                formData.append("uid", uid);
                formData.append("upass", upass);

                try {
                    await axios.post('/api/user/updatepw/', formData);
                    Swal.fire({
                        text: "비밀번호가 변경되었습니다!",
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                    })
                    history.push(`/my/info/${sessionStorage.getItem('uid')}`)
                } catch (e) {
                    Swal.fire({
                        text: "예상치 못한 오류가 발생하였습니다.",
                        icon: 'error',
                        confirmButtonColor: '#3085d6',
                    })
                }

            }
            //취소 click.
            else if(result.isDismissed){
                setIsCheck(false);
            }
        })
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
                            onChange={onChangeForm}
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

                    <Button onClick={isCheck === true ? onUpdate :
                        onSwalAlert} className='mt-3'>비밀번호 변경</Button>
                </Card>
            </Row>
        </div>
    )
}

export default MyUpdatePass